"use strict";

let slideIndex = 0;
let slides = document.querySelectorAll('.slide');
let timer;

function showSlide(n) {
    slides.forEach(slide => slide.style.display = 'none');
    slides[n].style.display = 'block';
}

function nextSlide() {
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    showSlide(slideIndex);
}

function toggleSlideShow() {
    let pauseButton = document.querySelector('.controls button:nth-child(2)');
    if (timer) {
        clearInterval(timer);
        timer = null;
        pauseButton.textContent = 'Play';
    } else {
        timer = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        pauseButton.textContent = 'Pause';
    }
}

// Initialize the slideshow
showSlide(slideIndex);
toggleSlideShow(); // Auto start slideshow



// document.addEventListener('DOMContentLoaded', () => {
//     const navLinks = document.querySelector('.nav-links');
//     const navContainer = document.querySelector('.nav-container');

//     // Scroll navbar using arrow buttons
//     document.querySelector('.nav-arrow.left').addEventListener('click', () => {
//         navContainer.scrollLeft -= 100; // Adjust scroll amount
//     });

//     document.querySelector('.nav-arrow.right').addEventListener('click', () => {
//         navContainer.scrollLeft += 100; // Adjust scroll amount
//     });

//     // Show/hide arrow buttons based on scroll position
//     navContainer.addEventListener('scroll', () => {
//         const maxScrollLeft = navLinks.scrollWidth - navLinks.clientWidth;
//         document.querySelector('.nav-arrow.left').style.display = navContainer.scrollLeft > 0 ? 'block' : 'none';
//         document.querySelector('.nav-arrow.right').style.display = navContainer.scrollLeft < maxScrollLeft ? 'block' : 'none';
//     });
// });
