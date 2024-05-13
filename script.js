
// anime slider (autoplay)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    // Hide the current slide
    slides[currentSlide].style.transform = 'translateX(-100%)';

    // Update currentSlide index
    currentSlide = (currentSlide + 1) % slides.length;

    // Display the next slide
    slides[currentSlide].style.transform = 'translateX(0)';
}

// Autoplay the slider every 5 seconds
setInterval(nextSlide, 5000);
// end of gallery 

