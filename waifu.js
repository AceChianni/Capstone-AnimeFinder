"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const categoryButtonsContainer = document.getElementById('categoryButtons');
    let imagesLoaded = 0;
    let currentCategory = '';
    let currentType = '';

    const loadImages = async (count) => {
        try {
            const response = await fetch(`https://api.waifu.pics/many/${currentType}/${currentCategory}`);
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

    const clearGallery = () => {
        gallery.innerHTML = '';
        imagesLoaded = 0;
        loadMoreButton.style.display = 'none'; // Hide "More! ❤" button when gallery is cleared
    };

    // SFW and NSFW categories lists
    const sfwCategories = [
        'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 
        'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 
        'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'
    ];

    const nsfwCategories = ['waifu', 'neko', 'trap', 'blowjob'];

    // Dynamically create SFW category buttons
    sfwCategories.forEach(category => {
        const button = createCategoryButton('sfw', category);
        categoryButtonsContainer.appendChild(button);
    });

    // Dynamically create NSFW category buttons
    nsfwCategories.forEach(category => {
        const button = createCategoryButton('nsfw', category);
        categoryButtonsContainer.appendChild(button);
    });

    function createCategoryButton(type, category) {
        const button = document.createElement('button');
        button.className = 'categoryButton';
        button.setAttribute('data-type', type);
        button.setAttribute('data-category', category);
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the category name
        return button;
    }

    // Event listener for category buttons
    categoryButtonsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('categoryButton')) {
            const type = event.target.getAttribute('data-type');
            const category = event.target.getAttribute('data-category');
            if (type !== currentType || category !== currentCategory) {
                clearGallery(); // Clear existing images if category changes
                currentType = type;
                currentCategory = category;
                loadImages(5); // Load images for the selected category
            }
        }
    });

    // Load more images when "More! ❤" button is clicked
    loadMoreButton.addEventListener('click', function() {
        loadImages(5);
    });
});
