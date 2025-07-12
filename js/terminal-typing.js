/**
 * Modern Terminal Typing Animation
 * Optimized for performance with efficient DOM manipulation
 */

class TerminalTyper {
    constructor(options = {}) {
        this.options = {
            typeSpeed: 80,
            deleteSpeed: 50,
            pauseTime: 1500,
            cursorBlinkSpeed: 530,
            ...options
        };
        
        this.isTyping = false;
        this.currentText = '';
        this.cursorElement = null;
        this.targetElement = null;
        this.animationFrame = null;
        this.cursorInterval = null;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startAnimation());
        } else {
            this.startAnimation();
        }
    }
    
    startAnimation() {
        this.targetElement = document.getElementById('typed-name');
        this.cursorElement = document.getElementById('cursor');
        
        if (!this.targetElement || !this.cursorElement) {
            console.warn('Terminal typing elements not found');
            return;
        }
        
        // Start cursor blinking
        this.startCursorBlink();
        
        // Start typing sequence
        setTimeout(() => {
            this.typeText('Jeremiah Smith', () => {
                setTimeout(() => {
                    this.showBioSection();
                }, this.options.pauseTime);
            });
        }, 500);
    }
    
    typeText(text, callback) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        let index = 0;
        
        const typeChar = () => {
            if (index < text.length) {
                this.currentText += text[index];
                this.targetElement.textContent = this.currentText;
                index++;
                
                // Use requestAnimationFrame for smooth animation
                setTimeout(() => {
                    this.animationFrame = requestAnimationFrame(typeChar);
                }, this.options.typeSpeed);
            } else {
                this.isTyping = false;
                if (callback) callback();
            }
        };
        
        typeChar();
    }
    
    showBioSection() {
        const bioLine = document.getElementById('bio-line');
        const bioOutput = document.getElementById('bio-output');
        const typedBio = document.getElementById('typed-bio');
        
        if (!bioLine || !bioOutput || !typedBio) return;
        
        // Show bio command line
        bioLine.style.display = 'block';
        bioLine.style.animation = 'fadeInUp 0.3s ease-out';
        
        setTimeout(() => {
            // Show bio output
            bioOutput.style.display = 'block';
            bioOutput.style.animation = 'fadeInUp 0.3s ease-out';
            
            // Type bio text
            this.typeBio(typedBio, 'Freelance Full-Stack Developer');
        }, 800);
    }
    
    typeBio(element, text) {
        let index = 0;
        const typeChar = () => {
            if (index < text.length) {
                element.textContent = text.substring(0, index + 1);
                index++;
                setTimeout(typeChar, this.options.typeSpeed - 20);
            }
        };
        typeChar();
    }
    
    startCursorBlink() {
        let visible = true;
        
        this.cursorInterval = setInterval(() => {
            if (this.cursorElement) {
                visible = !visible;
                this.cursorElement.style.opacity = visible ? '1' : '0';
            }
        }, this.options.cursorBlinkSpeed);
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.cursorInterval) {
            clearInterval(this.cursorInterval);
        }
    }
}

// Modern scroll reveal animation
class ScrollReveal {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        // Find elements to animate
        this.elements = document.querySelectorAll('[data-reveal]');
        
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );
            
            this.elements.forEach(el => this.observer.observe(el));
        } else {
            // Fallback for older browsers
            this.elements.forEach(el => el.classList.add('revealed'));
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Performance-optimized smooth scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('smoothscroll') || 
                e.target.closest('.smoothscroll')) {
                e.preventDefault();
                
                const link = e.target.classList.contains('smoothscroll') ? 
                    e.target : e.target.closest('.smoothscroll');
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.scrollTo(targetElement);
                }
            }
        });
    }
    
    scrollTo(element) {
        const targetPosition = element.offsetTop - 80; // Account for fixed nav
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 800);
        
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const ease = this.easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal typing animation
    new TerminalTyper({
        typeSpeed: 70,
        cursorBlinkSpeed: 500
    });
    
    // Initialize scroll animations
    new ScrollReveal();
    
    // Initialize smooth scrolling
    new SmoothScroll();
    
    // Phone number reveal
    const showPhoneBtn = document.getElementById('show-phone');
    const phoneDisplay = document.getElementById('phone-display');
    
    if (showPhoneBtn && phoneDisplay) {
        showPhoneBtn.addEventListener('click', () => {
            showPhoneBtn.style.display = 'none';
            phoneDisplay.style.display = 'inline';
            phoneDisplay.style.animation = 'fadeIn 0.3s ease-out';
        });
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    // Clean up any running animations
    if (window.terminalTyper) {
        window.terminalTyper.destroy();
    }
});