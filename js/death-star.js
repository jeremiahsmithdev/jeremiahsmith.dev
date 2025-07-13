// Death Star reveal animation
(function() {
    'use strict';
    
    function initDeathStar() {
        const closeButton = document.querySelector('.terminal-controls .control.close');
        const terminalContainer = document.querySelector('.terminal-container');
        const deathStarBg = document.getElementById('death-star-bg');
        
        console.log('Checking elements:', {
            closeButton: !!closeButton,
            terminalContainer: !!terminalContainer, 
            deathStarBg: !!deathStarBg
        });
        
        if (closeButton) {
            closeButton.style.cursor = 'pointer';
            closeButton.title = 'Exit Terminal';
            
            // Remove any existing listeners first
            closeButton.removeEventListener('click', handleCloseClick);
            closeButton.addEventListener('click', handleCloseClick);
            
            console.log('Death Star animation initialized');
        }
        
        function handleCloseClick(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Close button clicked - starting animation');
            
            if (terminalContainer && deathStarBg) {
                terminalContainer.classList.add('terminal-exit-animation');
                
                setTimeout(() => {
                    terminalContainer.classList.remove('terminal-exit-animation');
                    terminalContainer.classList.add('terminal-hiding');
                    deathStarBg.classList.add('death-star-revealed');
                    console.log('Death Star should now be visible');
                }, 500);
                
                setTimeout(() => {
                    terminalContainer.classList.remove('terminal-hiding');
                    deathStarBg.classList.remove('death-star-revealed');
                    console.log('Animation reset');
                }, 5000);
            } else {
                console.log('Missing elements for animation');
            }
        }
    }
    
    // Try multiple initialization methods
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDeathStar);
    } else {
        initDeathStar();
    }
    
    // Backup initialization
    setTimeout(initDeathStar, 1000);
})();