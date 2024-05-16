"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const categoryButtons = document.querySelectorAll('.categoryButton');
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

    // Event listener for category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const category = this.getAttribute('data-category');
            if (type !== currentType || category !== currentCategory) {
                clearGallery(); // Clear existing images if category changes
                currentType = type;
                currentCategory = category;
                loadImages(5); // Load initial set of images
            }
        });
    });

    // Load more images when "More! ❤" button is clicked
    loadMoreButton.addEventListener('click', function() {
        loadImages(5); // Load next set of images
    });
});
