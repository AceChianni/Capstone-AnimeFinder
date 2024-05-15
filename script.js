"use strict";

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
        // Click event on slide
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

    // Poll functionality
    const pollForm = document.querySelector("#animePoll");
    const pollResultsContainer = document.querySelector("#pollResults");

    // Update poll results display
    function updatePollResults() {
        pollResultsContainer.innerHTML = "";
        const totalVotes = Object.values(choices).reduce((a, b) => a + b, 0);

        for (const option in choices) {
            const votePercentage = totalVotes > 0 ? (choices[option] / totalVotes) * 100 : 0;
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item");
            resultItem.textContent = `${option}: ${choices[option]} votes`;

            const pollBar = document.createElement("div");
            pollBar.classList.add("poll-bar");
            pollBar.style.width = `${votePercentage}%`;

            resultItem.appendChild(pollBar);
            pollResultsContainer.appendChild(resultItem);
        }
    }

    // Submit poll form
    const choices = {}; // Track poll choices
    pollForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const selectedAnime = pollForm.querySelector('input[name="anime"]:checked');
        if (selectedAnime) {
            const animeName = selectedAnime.value;
            choices[animeName] = (choices[animeName] || 0) + 1;
            updatePollResults();
        } else {
            alert("Please select an anime before voting.");
        }
    });
});

