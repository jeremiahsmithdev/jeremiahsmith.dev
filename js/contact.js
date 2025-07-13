/**
 * Contact Form Handler
 * Handles form submission with AJAX
 */

$(document).ready(function() {
    
    // Contact form submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            contactName: $('#contactName').val(),
            contactEmail: $('#contactEmail').val(),
            contactSubject: $('#contactSubject').val() || 'Contact Form Submission',
            contactMessage: $('#contactMessage').val()
        };
        
        // Validate form
        if (!formData.contactName || !formData.contactEmail || !formData.contactMessage) {
            showMessage('warning', 'Please fill in all required fields.');
            return;
        }
        
        // Show loader
        $('#form-loader').fadeIn();
        $('.submit-btn').prop('disabled', true);
        
        // Submit form via AJAX
        $.ajax({
            type: 'POST',
            url: 'inc/sendEmail.php',
            data: formData,
            success: function(response) {
                $('#form-loader').fadeOut();
                $('.submit-btn').prop('disabled', false);
                
                if (response === 'OK') {
                    // Success
                    showMessage('success', 'Your message was sent successfully!');
                    $('#contact-form')[0].reset();
                } else {
                    // Error
                    showMessage('warning', 'Something went wrong. Please try again.');
                }
            },
            error: function() {
                $('#form-loader').fadeOut();
                $('.submit-btn').prop('disabled', false);
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
    
    // Input animation on focus
    $('.form-field input, .form-field textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
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