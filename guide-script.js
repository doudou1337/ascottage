// Guide page specific JavaScript functionality

// Smooth scrolling for guide navigation
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced smooth scrolling for guide navigation items
    document.querySelectorAll('.guide-nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                // Add offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll spy functionality
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Add sticky navigation behavior
    window.addEventListener('scroll', handleStickyNavigation);
    
    // Initialize animations
    initializeAnimations();
    
    // Add click tracking for external links
    trackExternalLinks();
});

// Handle sticky navigation behavior
function handleStickyNavigation() {
    const guideNav = document.querySelector('.guide-nav');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 200) {
        guideNav.classList.add('scrolled');
    } else {
        guideNav.classList.remove('scrolled');
    }
}

// Update active navigation item based on scroll position
function updateActiveNavItem() {
    const sections = document.querySelectorAll('.guide-section');
    const navItems = document.querySelectorAll('.guide-nav-item');
    const scrollPosition = window.scrollY + 150; // Offset for header

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove active class from all nav items
            navItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to corresponding nav item
            const sectionId = section.getAttribute('id');
            const correspondingNavItem = document.querySelector(`.guide-nav-item[href="#${sectionId}"]`);
            if (correspondingNavItem) {
                correspondingNavItem.classList.add('active');
            }
        }
    });
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    const animatedElements = document.querySelectorAll(`
        .restaurant-card, 
        .bar-card, 
        .shop-card, 
        .vineyard-card, 
        .activity-card, 
        .rule-card,
        .info-card
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Track clicks on external links for analytics
function trackExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const linkType = this.classList.contains('btn-maps') ? 'maps' : 
                           this.classList.contains('btn-website') ? 'website' : 'external';
            const linkText = this.textContent.trim();
            
            console.log(`External link clicked: ${linkType} - ${linkText}`);
            
            // You can add analytics tracking here
            // Example: gtag('event', 'click', { 'event_category': 'external_link', 'event_label': linkText });
        });
    });
}

// Add interactive hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to cards on click
    const cards = document.querySelectorAll('.restaurant-card, .bar-card, .shop-card, .vineyard-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if clicking on the card itself, not on buttons
            if (e.target.tagName !== 'A' && !e.target.closest('.btn')) {
                createRippleEffect(e, this);
            }
        });
    });
});

// Create ripple effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,56,92,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .guide-nav-item.active {
        background: #FF385C;
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 56, 92, 0.3);
    }
    
    .guide-nav-item.active i {
        color: white;
    }
`;
document.head.appendChild(style);

// Enhanced search functionality (if needed in the future)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Rechercher dans le guide...';
    searchInput.className = 'guide-search';
    
    // Add search styling
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .guide-search {
            width: 100%;
            max-width: 400px;
            padding: 12px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 16px;
            margin: 20px auto;
            display: block;
            transition: border-color 0.3s ease;
        }
        
        .guide-search:focus {
            outline: none;
            border-color: #FF385C;
            box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.1);
        }
        
        .search-results {
            margin-top: 20px;
        }
        
        .search-highlight {
            background: yellow;
            padding: 2px 4px;
            border-radius: 3px;
        }
    `;
    document.head.appendChild(searchStyle);
    
    // Add search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.restaurant-card, .bar-card, .shop-card, .vineyard-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Highlight search terms
        if (searchTerm.length > 2) {
            highlightSearchTerms(searchTerm);
        } else {
            removeHighlights();
        }
    });
    
    // Insert search box after hero section
    const heroSection = document.querySelector('.guide-hero');
    if (heroSection) {
        heroSection.after(searchInput);
    }
}

// Highlight search terms in content
function highlightSearchTerms(term) {
    removeHighlights();
    
    const cards = document.querySelectorAll('.restaurant-card, .bar-card, .shop-card, .vineyard-card');
    cards.forEach(card => {
        if (card.style.display !== 'none') {
            const walker = document.createTreeWalker(
                card,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const textNodes = [];
            let node;
            
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }
            
            textNodes.forEach(textNode => {
                const text = textNode.textContent;
                const regex = new RegExp(`(${term})`, 'gi');
                if (regex.test(text)) {
                    const highlightedText = text.replace(regex, '<span class="search-highlight">$1</span>');
                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = highlightedText;
                    textNode.parentNode.replaceChild(wrapper, textNode);
                }
            });
        }
    });
}

// Remove search highlights
function removeHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Add favorite functionality (for future enhancement)
function initializeFavorites() {
    const favoriteButtons = document.querySelectorAll('.restaurant-card, .bar-card, .shop-card, .vineyard-card');
    
    favoriteButtons.forEach(card => {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.title = 'Ajouter aux favoris';
        
        favoriteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.title = 'Retirer des favoris';
                this.style.color = '#FF385C';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.title = 'Ajouter aux favoris';
                this.style.color = '#484848';
            }
        });
        
        // Add favorite button styling
        const favoriteStyle = document.createElement('style');
        favoriteStyle.textContent = `
            .favorite-btn {
                position: absolute;
                top: 16px;
                right: 16px;
                background: white;
                border: 1px solid #e0e0e0;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 2;
                color: #484848;
            }
            
            .favorite-btn:hover {
                background: #f8f9fa;
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
        `;
        document.head.appendChild(favoriteStyle);
        
        card.style.position = 'relative';
        card.appendChild(favoriteBtn);
    });
}

// Translation system for guide page
let translations = {};
let currentLanguage = 'fr';

// Load translations
async function loadTranslations() {
    try {
        const [frResponse, enResponse] = await Promise.all([
            fetch('./translations/fr.json'),
            fetch('./translations/en.json')
        ]);
        
        translations.fr = await frResponse.json();
        translations.en = await enResponse.json();
        
        // Set initial language based on browser language or stored preference
        const browserLang = navigator.language.slice(0, 2);
        const storedLang = localStorage.getItem('guide-language');
        currentLanguage = storedLang || (browserLang === 'en' ? 'en' : 'fr');
        
        // Update UI
        updateLanguageDisplay();
        translatePage();
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
}

// Update language display in button
function updateLanguageDisplay() {
    const langButton = document.getElementById('currentLang');
    if (langButton) {
        langButton.textContent = currentLanguage.toUpperCase();
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

// Toggle language function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    localStorage.setItem('guide-language', currentLanguage);
    updateLanguageDisplay();
    translatePage();
}

// Translate the page content
function translatePage() {
    if (!translations[currentLanguage]) return;
    
    const t = translations[currentLanguage];
    
    // Translate elements with data-key attributes
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = getNestedTranslation(t, key);
        
        if (translation) {
            if (element.innerHTML.includes('<') || translation.includes('<')) {
                // Handle HTML content
                element.innerHTML = translation;
            } else {
                // Handle plain text
                element.textContent = translation;
            }
        }
    });
}

// Get nested translation value (e.g., "nav.guide")
function getNestedTranslation(obj, key) {
    return key.split('.').reduce((current, prop) => current && current[prop], obj);
}

// Initialize translation system
document.addEventListener('DOMContentLoaded', function() {
    loadTranslations();
});

// Make toggleLanguage available globally
window.toggleLanguage = toggleLanguage;

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.title = 'Retour en haut';
    
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #FF385C, #E31C5F);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
            box-shadow: 0 4px 16px rgba(255, 56, 92, 0.3);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(255, 56, 92, 0.4);
        }
    `;
    document.head.appendChild(backToTopStyle);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    document.body.appendChild(backToTopBtn);
});

// Wine Filter Functionality
function initializeWineFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const wineCards = document.querySelectorAll('.wine-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.getAttribute('data-filter');
            
            // Filter wine cards
            wineCards.forEach(card => {
                if (filterType === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const wineType = card.getAttribute('data-wine-type');
                    if (wineType === filterType) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
            
            // Add animation effect
            setTimeout(() => {
                wineCards.forEach(card => {
                    if (!card.classList.contains('hidden')) {
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    }
                });
            }, 100);
        });
    });
}

// Initialize wine filter
document.addEventListener('DOMContentLoaded', function() {
    initializeWineFilter();
});