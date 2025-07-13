/**
 * Contact Form Handler
 * Handles form submission with AJAX
 */

$(document).ready(function() {
    
    // Terminal contact form submission
    $('#terminal-contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data from terminal inputs
        const formData = {
            contactName: 'Anonymous', // We'll extract from email or set as anonymous
            contactEmail: $('#terminalEmail').val(),
            contactSubject: $('#terminalSubject').val() || 'Contact Form Submission',
            contactMessage: $('#terminalMessage').val()
        };
        
        // Extract name from email if possible
        if (formData.contactEmail) {
            const emailName = formData.contactEmail.split('@')[0];
            formData.contactName = emailName.replace(/[^a-zA-Z]/g, ' ').trim() || 'Anonymous';
        }
        
        // Validate form
        if (!formData.contactEmail || !formData.contactMessage) {
            showMessage('warning', 'Please fill in email and message fields.');
            return;
        }
        
        // Disable send button and show loading state
        $('.terminal-send-btn').prop('disabled', true).text('sending...');
        
        // Submit form via AJAX
        $.ajax({
            type: 'POST',
            url: 'inc/sendEmail.php',
            data: formData,
            success: function(response) {
                $('.terminal-send-btn').prop('disabled', false).text('send');
                
                if (response === 'OK') {
                    // Success
                    showMessage('success', 'Message sent successfully!');
                    $('#terminal-contact-form')[0].reset();
                } else {
                    // Error
                    showMessage('warning', 'Something went wrong. Please try again.');
                }
            },
            error: function() {
                $('.terminal-send-btn').prop('disabled', false).text('send');
                showMessage('warning', 'Unable to send message. Please try emailing directly.');
            }
        });
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