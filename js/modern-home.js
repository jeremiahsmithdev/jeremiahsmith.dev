/**
 * Modern Home Page Interactions
 * Additional functionality for the modernized home page
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION TOGGLE =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.modern-nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function() {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
            
            // Animate hamburger menu
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navList.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && window.innerWidth <= 768) {
                navList.style.display = 'none';
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // ===== DYNAMIC NAVIGATION BACKGROUND =====
    const nav = document.querySelector('.modern-nav');
    let lastScrollY = window.scrollY;
    
    function updateNavigation() {
        const currentScrollY = window.scrollY;
        
        if (nav) {
            // Add/remove background opacity based on scroll
            if (currentScrollY > 50) {
                nav.style.background = 'rgba(26, 26, 26, 0.98)';
            } else {
                nav.style.background = 'rgba(26, 26, 26, 0.95)';
            }
            
            // Hide/show navigation on scroll direction (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttled scroll event
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // ===== TERMINAL INTERACTIONS =====
    const terminalContainer = document.querySelector('.terminal-container');
    
    if (terminalContainer) {
        // Add click interaction to terminal controls
        const controls = terminalContainer.querySelectorAll('.control');
        controls.forEach(control => {
            control.addEventListener('click', function() {
                if (this.classList.contains('close')) {
                    // Minimize terminal animation
                    terminalContainer.style.transform = 'scale(0.95)';
                    terminalContainer.style.opacity = '0.8';
                    setTimeout(() => {
                        terminalContainer.style.transform = 'perspective(1000px) rotateX(5deg)';
                        terminalContainer.style.opacity = '1';
                    }, 200);
                } else if (this.classList.contains('minimize')) {
                    // Minimize animation
                    terminalContainer.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        terminalContainer.style.transform = 'perspective(1000px) rotateX(5deg)';
                    }, 150);
                } else if (this.classList.contains('maximize')) {
                    // Maximize animation
                    terminalContainer.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        terminalContainer.style.transform = 'perspective(1000px) rotateX(5deg)';
                    }, 150);
                }
            });
        });
    }
    
    // ===== ENHANCED SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Stagger animation for multiple elements
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        const animateElements = document.querySelectorAll('.hero-actions a, .social-link, .scroll-indicator');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations with delay
    setTimeout(initScrollAnimations, 1000);
    
    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        // Allow keyboard navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
        
        // ESC to close mobile menu
        if (e.key === 'Escape' && navList && navList.style.display === 'flex') {
            navList.style.display = 'none';
            mobileToggle.classList.remove('active');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Preload critical images
    function preloadImages() {
        const imageUrls = [
            'images/profilepic.png'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Lazy load non-critical content
    function lazyLoadContent() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadImages);
        } else {
            setTimeout(preloadImages, 100);
        }
    }
    
    lazyLoadContent();
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Improved focus management
    const focusableElements = 'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select';
    const modal = document.querySelector('.terminal-container');
    
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        transition: top 0.3s;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ===== REDUCED MOTION SUPPORT =====
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-medium', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }
    
    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.warn('Non-critical error caught:', e.error);
        // Graceful degradation - ensure basic functionality works
    });
    
    // ===== CLEANUP =====
    window.addEventListener('beforeunload', function() {
        // Clean up any intervals or observers
        if (window.scrollObserver) {
            window.scrollObserver.disconnect();
        }
    });
});

// ===== CSS FOR ADDITIONAL ENHANCEMENTS =====
const additionalStyles = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
    
    .mobile-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .terminal-container {
            transform: none !important;
        }
        
        .float-element,
        .bg-grid {
            animation: none !important;
        }
        
        .scroll-arrow span {
            animation: none !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);