// Create nav bar js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');

    // Scroll navbar using arrow buttons
    document.querySelector('.nav-arrow.left').addEventListener('click', () => {
        navContainer.scrollLeft -= 100; // Adjust scroll amount
    });

    document.querySelector('.nav-arrow.right').addEventListener('click', () => {
        navContainer.scrollLeft += 100; // Adjust scroll amount
    });

    // Show/hide arrow buttons based on scroll position
    navContainer.addEventListener('scroll', () => {
        const maxScrollLeft = navLinks.scrollWidth - navLinks.clientWidth;
        document.querySelector('.nav-arrow.left').style.display = navContainer.scrollLeft > 0 ? 'block' : 'none';
        document.querySelector('.nav-arrow.right').style.display = navContainer.scrollLeft < maxScrollLeft ? 'block' : 'none';
    });
});



let currentSlide = 0;
let slideshowInterval;

// Function to show current slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    }

    slides.forEach((slide) => {
        slide.style.display = 'none';
    });

    slides[currentSlide].style.display = 'block';
}

// Function to switch to next slide
function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

// Function to switch to previous slide
function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Function to start or pause slideshow
function toggleSlideShow() {
    const pauseButton = document.querySelector('.controls button:nth-child(2)');
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        pauseButton.textContent = 'Play';
    } else {
        slideshowInterval = setInterval(nextSlide, 5000);
        pauseButton.textContent = 'Pause';
    }
}

// Initialize slideshow
showSlide(currentSlide);
slideshowInterval = setInterval(nextSlide, 5000);
