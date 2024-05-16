"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const animeSlider = document.querySelector(".anime-slider");

    // Function to fetch trending anime data from Kitsu API
    async function fetchTrendingAnime() {
        try {
            const response = await fetch("https://kitsu.io/api/edge/trending/anime");
            const data = await response.json();
            return data.data; // Use the 'data' array from the response
        } catch (error) {
            console.error("Error fetching trending anime:", error);
            return []; // Return empty array in case of error
        }
    }

    // Function to update the anime slideshow with fetched images and titles
    async function updateAnimeSlideshow() {
        const animeData = await fetchTrendingAnime();

        // Clear existing slides
        animeSlider.innerHTML = "";

        // Display fetched images and titles in slideshow (6 to 10 images)
        animeData.slice(0, Math.min(animeData.length, 10)).forEach(anime => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            
            const image = document.createElement("img");
            image.src = anime.attributes.posterImage.medium; // Use poster image URL
            image.alt = anime.attributes.canonicalTitle;
            
            const title = document.createElement("p");
            title.textContent = anime.attributes.canonicalTitle;
            title.classList.add("anime-title");
            
            slide.appendChild(image);
            slide.appendChild(title);
            animeSlider.appendChild(slide);
        });

        // Restart slideshow with updated content
        restartSlideshow();
    }

    // Function to restart the slideshow
    function restartSlideshow() {
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;
        let slideshowInterval;

        function showSlide(slideIndex) {
            slides.forEach((slide, index) => {
                slide.style.display = index === slideIndex ? "block" : "none";
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Clear existing interval if any
        clearInterval(slideshowInterval);

        // Start new slideshow interval
        slideshowInterval = setInterval(nextSlide, 3000);
        showSlide(currentSlide); // Show initial slide
    }

    // Initial setup: fetch and update anime slideshow
    updateAnimeSlideshow();

// document.addEventListener("DOMContentLoaded", function() {
//     const slides = document.querySelectorAll(".slide");
//     let currentSlide = 0;
//     let slideshowInterval;

//     // Function to show a specific slide
//     function showSlide(slideIndex) {
//         slides.forEach((slide, index) => {
//             slide.style.display = index === slideIndex ? "block" : "none";
//         });
//     }

//     // Function to show the next slide
//     function nextSlide() {
//         currentSlide = (currentSlide + 1) % slides.length;
//         showSlide(currentSlide);
//     }

//     // Function to show the previous slide
//     function prevSlide() {
//         currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//         showSlide(currentSlide);
//     }

//     // Function to toggle slideshow play/pause
//     function toggleSlideShow() {
//         if (slideshowInterval) {
//             clearInterval(slideshowInterval);
//             slideshowInterval = null;
//         } else {
//             slideshowInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
//         }
//     }

//     // Initial setup: show the first slide and start slideshow
//     showSlide(currentSlide);
//     slideshowInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds 

//     // Event listener for slideshow controls
//     slides.forEach(slide => {
//         slide.addEventListener("click", function(event) {
//             const slideWidth = slide.offsetWidth;
//             const clickX = event.offsetX;

//             if (clickX < slideWidth * 0.3) {
//                 prevSlide();
//             } else if (clickX > slideWidth * 0.7) {
//                 nextSlide();
//             } else {
//                 toggleSlideShow();
//             }
//         });
//     });

    // Poll functionality
    const pollForm = document.querySelector("#animePoll");
    const pollResultsContainer = document.querySelector("#pollResults");
    const choices = {}; // Track poll choices

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
);
