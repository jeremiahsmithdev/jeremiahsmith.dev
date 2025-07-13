/**
 * Contact Form Handler
 * Handles form submission with AJAX
 */

$(document).ready(function() {
    
    // Terminal contact form submission - simple validation only
    $('#terminal-contact-form').on('submit', function(e) {
        // Get form data from terminal inputs for validation
        const email = $('#terminalEmail').val();
        const message = $('#terminalMessage').val();
        
        // Validate form
        if (!email || !message) {
            e.preventDefault();
            showMessage('warning', 'Please fill in email and message fields.');
            return false;
        }
        
        // Show loading state
        $('.terminal-send-btn').prop('disabled', true).text('sending...');
        
        // Let the form submit naturally to Formspree
        // Formspree will handle the redirect
    });
    
    // Show message function
    function showMessage(type, message) {
        // Hide all messages first
        $('.message-box').hide();
        
        // Update and show appropriate message
        if (type === 'success') {
            $('#message-success span').text(message);
            $('#message-success').fadeIn();
        } else {
            $('#message-warning span').text(message);
            $('#message-warning').fadeIn();
        }
        
        // Hide message after 5 seconds
        setTimeout(function() {
            $('.message-box').fadeOut();
        }, 5000);
    }
    
    // Add terminal success feedback
    function addTerminalSuccess() {
        const terminalBody = $('.terminal-body');
        
        // Add success line to terminal
        const successLine = $('<div class="terminal-line terminal-success-line">' +
            '<span class="terminal-output" style="color: var(--terminal-green);">✓ Message sent successfully!</span>' +
            '</div>');
        
        // Insert before the send button line
        $('.terminal-form-line').last().before(successLine);
        
        // Animate it in
        successLine.hide().fadeIn();
        
        // Remove it after 3 seconds
        setTimeout(() => {
            successLine.fadeOut(() => {
                successLine.remove();
            });
        }, 3000);
    }
    
    // Terminal input focus effects
    $('.terminal-input, .terminal-textarea').on('focus', function() {
        $(this).addClass('focused');
    }).on('blur', function() {
        $(this).removeClass('focused');
    });
    
    // Terminal cursor animation
    let cursorVisible = true;
    setInterval(function() {
        cursorVisible = !cursorVisible;
        $('.terminal-cursor').css('opacity', cursorVisible ? '1' : '0');
    }, 500);
});

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}