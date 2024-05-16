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

    // Poll functionality (kept from original code)
    const pollForm = document.querySelector("#animePoll");
    const pollResultsContainer = document.querySelector("#pollResults");
    const choices = {}; // Track poll choices

    // Update poll results display (kept from original code)
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

    // Submit poll form (kept from original code)
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
