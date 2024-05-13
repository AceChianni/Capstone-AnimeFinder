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
    document.querySelector("#prevBtn").addEventListener("click", prevSlide);
    document.querySelector("#pauseBtn").addEventListener("click", toggleSlideShow);
    document.querySelector("#nextBtn").addEventListener("click", nextSlide);
});
