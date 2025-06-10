// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Email contact handling - no form needed, direct mailto links

// Awards Carousel functionality
let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName('award-slide');
    let dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance carousel
function autoAdvanceCarousel() {
    slideIndex++;
    showSlides(slideIndex);
}

// Amenities tab functionality
function showCategory(categoryId) {
    // Hide all categories
    const categories = document.getElementsByClassName('amenity-category');
    for (let category of categories) {
        category.classList.remove('active');
    }
    
    // Remove active class from all tabs
    const tabs = document.getElementsByClassName('tab-btn');
    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    
    // Show selected category
    const selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        selectedCategory.classList.add('active');
    }
    
    // Add active class to clicked tab
    const clickedTab = event.target.closest('.tab-btn');
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.overview, .amenities, .location, .contact').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add click tracking for Airbnb buttons
    document.querySelectorAll('a[href*="airbnb"]').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Airbnb booking button clicked');
            // You can add analytics tracking here
        });
    });
    
    // Image lazy loading for better performance
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    // Initialize carousel auto-advance
    setInterval(autoAdvanceCarousel, 5000); // Change slide every 5 seconds
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Mobile menu toggle (if you want to add a mobile menu later)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Booking card sticky behavior
window.addEventListener('scroll', function() {
    const bookingCard = document.querySelector('.booking-card');
    const footer = document.querySelector('.footer');
    
    if (bookingCard && footer) {
        const footerTop = footer.offsetTop;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (scrollTop + windowHeight > footerTop) {
            bookingCard.style.position = 'absolute';
            bookingCard.style.bottom = '0';
        } else {
            bookingCard.style.position = 'sticky';
            bookingCard.style.bottom = 'auto';
        }
    }
});

// Photo Gallery functionality - Curated collection showcasing all property features
const galleryImages = [
    {
        src: 'img/1.jpeg',
        title: 'Gîte cosy style château avec vue sur étang',
        alt: 'Image 1 du logement Gîte cosy style château avec vue sur étang'
    },
    {
        src: 'img/2.jpeg',
        title: 'Salon avec cuisine ouverte, plein de lumière naturelle',
        alt: 'Living area with open kitchen, full of natural light'
    },
    {
        src: 'img/3.jpeg',
        title: 'Canapé-lit pliant',
        alt: 'Foldable sofa bed'
    },
    {
        src: 'img/4.jpeg',
        title: 'Cheminée',
        alt: 'Fireplace'
    },
    {
        src: 'img/5.jpeg',
        title: 'Table à manger pour 3 personnes',
        alt: 'Dining table for 3 people'
    },
    {
        src: 'img/6.jpeg',
        title: 'Rideau épais pour séparer l\'espace nuit et salon',
        alt: 'Thick curtain to separate the sleeping area and living area'
    },
    {
        src: 'img/7.jpeg',
        title: 'Cuisine entièrement équipée, accès de plain-pied',
        alt: 'Fully equipped kitchen, step-free access'
    },
    {
        src: 'img/8.jpeg',
        title: 'Chambre avec lit Queen Size',
        alt: 'Chambre (French for Bedroom)'
    },
    {
        src: 'img/9.jpeg',
        title: 'Chambre vue 2',
        alt: 'Bedroom image 2'
    },
    {
        src: 'img/10.jpeg',
        title: 'Chambre vue 3',
        alt: 'Bedroom image 3'
    },
    {
        src: 'img/11.jpeg',
        title: 'Chambre vue 4',
        alt: 'Bedroom image 4'
    },
    {
        src: 'img/12.jpeg',
        title: 'Salle de bain vue 1',
        alt: 'Salle de bain image 1'
    },
    {
        src: 'img/13.jpeg',
        title: 'Salle de bain vue 2',
        alt: 'Salle de bain image 2'
    },
    {
        src: 'img/14.jpeg',
        title: 'Salle de bain vue 3',
        alt: 'Salle de bain image 3'
    },
    {
        src: 'img/15.jpeg',
        title: 'Barbecue en pierre extérieur',
        alt: 'Outdoor stone BBQ'
    },
    {
        src: 'img/16.jpeg',
        title: 'L\'étang et le jardin',
        alt: 'The pond and the garden'
    },
    {
        src: 'img/17.jpeg',
        title: 'Chaises et table extérieures dans le jardin',
        alt: 'A set of 2 outdoor chairs and a small table, perfect for having coffee in the morning, plus one comfortable outdoor chair'
    },
    {
        src: 'img/18.jpeg',
        title: 'Vue supplémentaire de la véranda',
        alt: 'Veranda image 3'
    },
    {
        src: 'img/19.jpeg',
        title: 'Savon pour les mains et articles de salle de bain',
        alt: 'Hand soap'
    },
    {
        src: 'img/20.jpeg',
        title: 'Nourriture pour poissons fournie avec le séjour',
        alt: 'We provide you with fish food if you want to feed them during your stay.'
    },
    {
        src: 'img/21.jpeg',
        title: 'Livraison du petit-déjeuner à la véranda',
        alt: 'We will deliver the breakfast to your the Veranda at the time of your choice.'
    },
    {
        src: 'img/22.jpeg',
        title: 'Sèche-cheveux et autres accessoires de salle de bain',
        alt: 'Hair dryer, body scale, cotton pads and cotton swabs'
    }
];

let currentImageIndex = 0;

function openGallery(imageIndex = 0) {
    currentImageIndex = imageIndex;
    const modal = document.getElementById('photoGallery');
    const galleryImage = document.getElementById('galleryImage');
    const galleryTitle = document.getElementById('galleryTitle');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    
    // Update image and info
    galleryImage.src = galleryImages[currentImageIndex].src;
    galleryImage.alt = galleryImages[currentImageIndex].alt;
    galleryTitle.textContent = galleryImages[currentImageIndex].title;
    currentImageSpan.textContent = currentImageIndex + 1;
    totalImagesSpan.textContent = galleryImages.length;
    
    // Generate thumbnails
    generateThumbnails();
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Update navigation buttons
    updateNavigationButtons();
}

function closeGallery() {
    const modal = document.getElementById('photoGallery');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGalleryImage();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
}

function goToImage(index) {
    currentImageIndex = index;
    updateGalleryImage();
}

function updateGalleryImage() {
    const galleryImage = document.getElementById('galleryImage');
    const galleryTitle = document.getElementById('galleryTitle');
    const currentImageSpan = document.getElementById('currentImage');
    
    galleryImage.src = galleryImages[currentImageIndex].src;
    galleryImage.alt = galleryImages[currentImageIndex].alt;
    galleryTitle.textContent = galleryImages[currentImageIndex].title;
    currentImageSpan.textContent = currentImageIndex + 1;
    
    // Update thumbnail active state
    updateThumbnailActiveState();
    updateNavigationButtons();
}

function generateThumbnails() {
    const container = document.getElementById('thumbnailsContainer');
    container.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = image.alt;
        thumbnail.className = 'thumbnail';
        thumbnail.onclick = () => goToImage(index);
        
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        
        container.appendChild(thumbnail);
    });
}

function updateThumbnailActiveState() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    
    // Enable/disable buttons based on current position
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === galleryImages.length - 1;
}

// Keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('photoGallery');
    if (modal.style.display === 'block') {
        switch(e.key) {
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeGallery();
                break;
        }
    }
});

// Close gallery when clicking outside image
document.getElementById('photoGallery').addEventListener('click', function(e) {
    if (e.target === this) {
        closeGallery();
    }
});

// Language switching functionality
const translations = {
    fr: {
        'nav-overview': 'Aperçu',
        'nav-amenities': 'Équipements',
        'nav-location': 'Localisation',
        'nav-reviews': 'Avis',
        'nav-contact': 'Contact',
        'hero-title': 'Gîte cosy style château avec vue sur étang',
        'hero-subtitle': 'Bienvenue dans notre gîte du XVIIIe, classé 4 étoiles Meublé de Tourisme',
        'hero-book-btn': 'Réserver sur Airbnb',
        'hero-contact-btn': 'Nous contacter',
        'hero-rating': '5.0 (42 avis)',
        'awards-title': 'Nos Récompenses et Certifications',
        'reviews-title': 'Ce que disent nos voyageurs',
        'reviews-all': '42 avis · Tous 5 étoiles',
        'view-all-photos': 'Voir toutes les photos',
        'guests': '3 voyageurs',
        'bedroom': '1 chambre',
        'beds': '2 lits',
        'bathrooms': '1,5 salles de bain',
        'about-title': 'À propos de ce logement',
        'tab-overview': 'Aperçu',
        'tab-accommodation': 'Le logement',
        'tab-access': 'Accès',
        'tab-cycling': 'Cyclisme',
        'tab-attractions': 'Attractions',
        'tab-rules': 'Règles',
        'overview-text': 'Bienvenue dans notre gîte du XVIIIe, classé 4 étoiles Meublé de Tourisme. Ce logement au style château alliant le charme historique et le confort moderne.',
        'private-space': 'Espace Privé : Profitez d\'un espace isolé avec entrée indépendante donnant sur un étang.',
        'comfort': 'Confort et Commodités : Cuisine équipée, espace nuit confortable, poêle à bois.',
        'relaxation': 'Détente : Profitez de votre véranda, de votre espace extérieur privé et du barbecue en pierre.',
        'location': 'Emplacement Idéal : Explorez Angers à proximité, à seulement 10 minutes.'
    },
    en: {
        'nav-overview': 'Overview',
        'nav-amenities': 'Amenities',
        'nav-location': 'Location',
        'nav-reviews': 'Reviews',
        'nav-contact': 'Contact',
        'hero-title': 'Cozy château-style cottage with pond view',
        'hero-subtitle': 'Welcome to our 18th century cottage, classified 4-star Furnished Tourism',
        'hero-book-btn': 'Book on Airbnb',
        'hero-contact-btn': 'Contact us',
        'hero-rating': '5.0 (42 reviews)',
        'awards-title': 'Our Awards and Certifications',
        'reviews-title': 'What our guests say',
        'reviews-all': '42 reviews · All 5 stars',
        'view-all-photos': 'View all photos',
        'guests': '3 guests',
        'bedroom': '1 bedroom',
        'beds': '2 beds',
        'bathrooms': '1.5 bathrooms',
        'about-title': 'About this accommodation',
        'tab-overview': 'Overview',
        'tab-accommodation': 'The accommodation',
        'tab-access': 'Access',
        'tab-cycling': 'Cycling',
        'tab-attractions': 'Attractions',
        'tab-rules': 'Rules',
        'overview-text': 'Welcome to our 18th century cottage, classified 4-star Furnished Tourism. This château-style accommodation combines historic charm with modern comfort.',
        'private-space': 'Private Space: Enjoy an isolated space with independent entrance overlooking a pond.',
        'comfort': 'Comfort and Amenities: Equipped kitchen, comfortable sleeping area, wood stove.',
        'relaxation': 'Relaxation: Enjoy your veranda, private outdoor space and stone barbecue.',
        'location': 'Ideal Location: Explore nearby Angers, just 10 minutes away.'
    }
};

let currentLanguage = 'fr';

// Detect browser language
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
        return 'en';
    }
    return 'fr';
}

// Initialize language based on browser preference
function initializeLanguage() {
    const preferredLang = detectBrowserLanguage();
    if (preferredLang !== currentLanguage) {
        currentLanguage = preferredLang;
        updateLanguage();
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    updateLanguage();
}

function updateLanguage() {
    const currentLangSpan = document.getElementById('currentLang');
    currentLangSpan.textContent = currentLanguage.toUpperCase();
    
    // Update all elements with data-key attributes
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update photo gallery modal text
    const galleryTitle = document.getElementById('galleryTitle');
    if (galleryTitle && galleryImages[currentImageIndex]) {
        const titleKey = currentLanguage === 'en' ? 'title_en' : 'title';
        galleryTitle.textContent = galleryImages[currentImageIndex][titleKey] || galleryImages[currentImageIndex].title;
    }
    
    // Update gallery images with language-specific titles
    galleryImages.forEach((image, index) => {
        if (currentLanguage === 'en') {
            switch(index) {
                case 0: image.title_en = 'Main view of the cozy château-style cottage'; break;
                case 1: image.title_en = 'Bright living room with fireplace'; break;
                case 2: image.title_en = 'Comfortable main bedroom'; break;
                case 3: image.title_en = 'Fully equipped kitchen'; break;
                case 4: image.title_en = 'Magnificent pond view'; break;
                case 5: image.title_en = 'Terrace with panoramic view'; break;
                case 6: image.title_en = 'Outdoor relaxation area'; break;
                case 7: image.title_en = 'Private and peaceful garden'; break;
                case 8: image.title_en = 'Cozy bedroom'; break;
                case 9: image.title_en = 'Modern bathroom'; break;
                case 10: image.title_en = 'Dining area with character'; break;
                case 11: image.title_en = 'Château architectural details'; break;
                case 12: image.title_en = 'Warm living space'; break;
                case 13: image.title_en = 'Overview of the cottage'; break;
                case 14: image.title_en = 'Bedroom with garden view'; break;
                case 15: image.title_en = 'Surrounding green spaces'; break;
            }
        }
    });
}

// Description tab functionality
function showDescriptionTab(tabId) {
    // Hide all tab contents
    const contents = document.getElementsByClassName('desc-tab-content');
    for (let content of contents) {
        content.classList.remove('active');
    }
    
    // Remove active class from all tabs
    const tabs = document.getElementsByClassName('desc-tab-btn');
    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    
    // Show selected tab content
    const selectedContent = document.getElementById(tabId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to clicked tab
    const clickedTab = document.querySelector(`[onclick="showDescriptionTab('${tabId}')"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
});