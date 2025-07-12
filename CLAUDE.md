# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **jeremiahsmith.dev**, a personal portfolio website built as a single-page application. It's a static website showcasing Jeremiah Smith's professional experience, skills, and portfolio as a software developer.

**Technology Stack:**
- Vanilla HTML5, CSS3, and JavaScript
- jQuery (v1.10.2) for DOM manipulation and animations
- External libraries: Typewriter.js, Magnific Popup, FlexSlider, jQuery Waypoints, FitText
- Based on the CEEVEE template by Styleshout (Creative Commons licensed)

## Development Commands

**Install Dependencies:**
```bash
npm install
```

**Development:**
- No build process required - this is a static site
- Edit files directly and refresh browser to see changes
- Main entry point: `index.html`

**Deployment:**
- Hosted on GitHub Pages with custom domain: www.jeremiahsmith.dev
- Simply push to master branch to deploy

## Architecture and File Structure

**Single Page Application Structure:**
- `index.html` - Main HTML file containing all sections (Header, About, Resume, Portfolio, Contact)
- Sections are div elements with IDs: `#home`, `#about`, `#resume`, `#portfolio`, `#contact`
- Navigation uses smooth scrolling to jump between sections

**Key Directories:**
- `css/` - Stylesheets (default.css, layout.css, media-queries.css) and fonts
- `js/` - JavaScript files including init.js (main logic) and third-party libraries
- `images/` - All visual assets including profile photos, portfolio items, company logos
- `inc/` - Server-side components (sendEmail.php for contact form)

**Core JavaScript Initialization (js/init.js):**
- FitText for responsive headlines
- Smooth scrolling navigation
- Portfolio modal setup with Magnific Popup
- jQuery Waypoints for scroll-triggered animations
- FlexSlider initialization
- Contact form handling

**Key Features:**
- Typewriter animation for name display using eo-typewriterjs
- Responsive design with mobile-first approach
- Interactive phone number reveal
- Portfolio items with modal lightbox display
- Contact form with PHP backend processing
- Social media integration (LinkedIn, GitHub, Strava)

## Content Management

**Personal Information Updates:**
- Contact details in `#contact` section of index.html
- Social media links in header and footer
- Resume/CV download link in about section
- Professional experience in `#resume` section

**Portfolio Management:**
- Portfolio items in `#portfolio` section of index.html
- Portfolio images stored in `images/portfolio/` directory
- Modal content defined in hidden divs with IDs matching portfolio items

**Skills and Progress Bars:**
- Skills section uses CSS-based progress bars
- Update percentages in both HTML data attributes and CSS widths

## Styling Guidelines

**CSS Organization:**
- `default.css` - Base styles, typography, colors
- `layout.css` - Layout-specific styles, sections, components
- `media-queries.css` - Responsive breakpoints and mobile styles

**Color Scheme:**
- Primary colors defined in CSS custom properties
- Consistent use of brand colors throughout
- Dark/light theme handled via CSS classes

## External Dependencies and APIs

**CDN Resources:**
- jQuery loaded from local file (js/jquery-1.10.2.min.js)
- Google Fonts (Open Sans, Libre Baskerville)
- Font Awesome icons via local files

**Third-party Integrations:**
- Credly badges for certifications (embedded via script)
- LinkedIn profile integration
- Strava activity widgets

## Important Notes

- This is a template-based site - maintain attribution to Styleshout in footer
- No automated testing setup - test manually across browsers/devices
- Contact form requires PHP server for email functionality
- All images should be optimized for web (consider file size and loading performance)
- Mobile-first responsive design - test on various screen sizes