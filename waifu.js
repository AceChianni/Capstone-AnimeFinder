"use strict";
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const resetButton = document.getElementById('resetButton');
    const typeButtons = document.getElementById('typeButtons');
    const categoryButtonsContainer = document.getElementById('categoryButtons');
    let imagesLoaded = 0;
    let currentType = '';
    let currentCategory = '';

    // Show category buttons based on selected type (SFW or NSFW)
    typeButtons.addEventListener('click', function(event) {
        if (event.target.classList.contains('typeButton')) {
            currentType = event.target.getAttribute('data-type');
            typeButtons.style.display = 'none'; // Hide type buttons after selection
            showCategoryButtons(currentType); // Show category buttons based on selected type
        }
    });

    // Show category buttons based on selected type (SFW or NSFW)
    function showCategoryButtons(type) {
        categoryButtonsContainer.style.display = 'block';
        const categories = (type === 'sfw') ?
            ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'] :
            ['waifu', 'neko', 'trap', 'blowjob'];

        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'categoryButton';
            button.setAttribute('data-category', category);
            button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryButtonsContainer.appendChild(button);
        });
    }

    // Load images based on selected category
    categoryButtonsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('categoryButton')) {
            currentCategory = event.target.getAttribute('data-category');
            clearGallery(); // Clear existing images
            loadImages(5); // Load initial set of images
        }
    });

    // Load more images when "More! ❤" button is clicked
    loadMoreButton.addEventListener('click', function() {
        loadImages(5); // Load next set of images
    });

    // Reset selection and show type buttons again
    resetButton.addEventListener('click', function() {
        typeButtons.style.display = 'block';
        categoryButtonsContainer.style.display = 'none';
        clearGallery(); // Clear existing images
        currentType = '';
        currentCategory = '';
    });

    // Function to load images from the API
    const loadImages = async (count) => {
        try {
            const response = await fetch(`https://api.waifu.pics/${currentType}/${currentCategory}`);
            const data = await response.json();
            const images = data.files.slice(imagesLoaded, imagesLoaded + count);

            images.forEach(imageUrl => {
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = 'Waifu Image';
                gallery.appendChild(image);
            });

            imagesLoaded += count;
            loadMoreButton.style.display = 'block'; // Show the "More! ❤" button after images are loaded
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    // Function to clear the gallery
    const clearGallery = () => {
        gallery.innerHTML = '';
        imagesLoaded = 0;
        loadMoreButton.style.display = 'none'; // Hide "More! ❤" button when gallery is cleared
    };
});
