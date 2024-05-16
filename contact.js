"use strict"

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from actually submitting

    // Show the popup
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    // Hide the popup after 3 seconds
    setTimeout(function() {
        popup.style.display = 'none';
        document.getElementById('contactForm').reset(); // Reset the form fields
    }, 3000);
});
