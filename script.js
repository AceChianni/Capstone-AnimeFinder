"use strict"

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let slideshowInterval;

    // Function to show a specific slide
    function showSlide(slideIndex) {
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
    }

    // Function to show the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to show the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Function to toggle slideshow play/pause
    function toggleSlideShow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        } else {
            slideshowInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        }
    }

    // Initial setup: show the first slide and start slideshow
    showSlide(currentSlide);
    slideshowInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds 

    // Event listeners for slideshow controls
    slides.forEach(slide => {
        // Click event on left part of slide (previous slide)
        slide.addEventListener("click", function(event) {
            const slideWidth = slide.offsetWidth;
            const clickX = event.offsetX;

            if (clickX < slideWidth * 0.3) { // Left 30% of slide
                prevSlide();
            } else if (clickX > slideWidth * 0.7) { // Right 30% of slide
                nextSlide();
            } else { // Middle 40% of slide
                toggleSlideShow();
            }
        });
    });

    // Update poll status bar based on votes
    const pollForm = document.querySelector("#animePoll");
    const statusBar = document.querySelector("#pollStatusBar");

    pollForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const selectedAnime = pollForm.querySelector('input[name="anime"]:checked');
        if (selectedAnime) {
            const animeName = selectedAnime.value;
            const statusBarText = `Thank you for voting! Current top choice: ${animeName}`;
            statusBar.textContent = statusBarText;
        } else {
            statusBar.textContent = "Please select an anime before voting.";
        }
    });
});
