# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional static website for "A.S. Cottage" - a cozy château-style cottage Airbnb listing in Loire-Authion, France. The site serves as a marketing website showcasing the property's features, amenities, and booking information.

## Architecture & Structure

- **Single-page application**: Pure HTML/CSS/JavaScript without build tools
- **No framework dependencies**: Vanilla JavaScript with modern ES6+ features
- **Self-contained**: All assets are local except external fonts and CDN icons
- **Responsive design**: Mobile-first approach with CSS Grid and Flexbox

### Key Components

1. **Image Gallery System** (`script.js:166-399`): Interactive photo gallery with modal, thumbnails, and keyboard navigation
2. **Awards Carousel** (`script.js:17-56`): Auto-advancing carousel for certifications
3. **Amenities Tab System** (`script.js:57-82`): Dynamic content switching for property amenities  
4. **Language Switching** (`script.js:408-554`): French/English translation system
5. **Description Tabs** (`script.js:556-590`): Property description content organization

## Development Workflow

### Testing the Site
- Open `index.html` directly in a web browser
- No build process required - all files are ready to serve

### Image Management
- Property images: `img/1.jpeg` through `img/22.jpeg` (sequential numbering)
- Brand assets: `img/airbnb.png`, `img/meublétourisme.jpg`, `img/profil.jpg`
- Gallery images are defined in `script.js:167-278` with metadata

### Content Updates
- Property details in HTML sections: hero, overview, amenities, reviews
- Translations in `script.js:409-484` for French/English content
- Contact information: Currently `hello@ascottage.fr` (update as needed)

## Styling Approach

- **Color scheme**: Primary `#FF385C` (Airbnb red), Secondary `#06466A` (custom blue)
- **Typography**: Circular font (Airbnb style) with system fallbacks
- **Component-based CSS**: Each section has dedicated styles in `styles.css`
- **Animation**: CSS transitions and JavaScript-triggered animations

## Key Configuration

- **Airbnb listing**: `https://www.airbnb.fr/rooms/1150517326023370688`
- **Domain**: `ascottage.fr` (configured via CNAME file)
- **Hosting**: GitHub Pages ready (static files only)

## Important Notes

- No external JavaScript dependencies (except Font Awesome CDN for icons)
- Images are optimized for web but maintain quality for property showcase
- Language detection uses browser preferences (`navigator.language`)
- Gallery supports 22 property images with detailed descriptions
- Awards carousel auto-advances every 5 seconds
- All interactive elements have hover states and smooth transitions