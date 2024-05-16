"use strict";
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

    // Event listener for type buttons (SFW or NSFW)
    typeButtons.addEventListener('click', function(event) {
        if (event.target.classList.contains('typeButton')) {
            currentType = event.target.getAttribute('data-type');
            typeButtons.style.display = 'none'; // Hide type buttons after selection
            showCategoryButtons(currentType); // Show category buttons based on selected type
        }
    });

    // Function to show category buttons based on selected type
    function showCategoryButtons(type) {
        categoryButtonsContainer.style.display = 'block';
        categoryButtonsContainer.innerHTML = ''; // Clear existing buttons

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

    // Event listener for category buttons
    categoryButtonsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('categoryButton')) {
            currentCategory = event.target.getAttribute('data-category');
            clearGallery(); // Clear existing images
            loadImages(5); // Load initial set of images
        }
    });

    // Event listener for "Load More" button
    loadMoreButton.addEventListener('click', function() {
        loadImages(5); // Load next set of images
    });

    // Event listener for "Reset" button
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
            const apiUrl = `https://api.waifu.pics/many/${currentType}/${currentCategory}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: currentType,
                    category: currentCategory
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            const images = data.files.slice(imagesLoaded, imagesLoaded + count);

            images.forEach(imageUrl => {
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = 'Waifu Image';
                gallery.appendChild(image);
            });

            imagesLoaded += count;
            loadMoreButton.style.display = 'block'; // Show the "Load More" button after images are loaded
            resetButton.style.display = 'block'; // Show the "Reset" button after images are loaded
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    // Function to clear the gallery
    const clearGallery = () => {
        gallery.innerHTML = '';
        imagesLoaded = 0;
        loadMoreButton.style.display = 'none'; // Hide "Load More" button when gallery is cleared
        resetButton.style.display = 'none'; // Hide "Reset" button when gallery is cleared
    };
});
