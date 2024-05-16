"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const categorySelect = document.getElementById('category');
    let imagesLoaded = 0;
    let currentCategory = categorySelect.value;

    const loadImages = async (count) => {
        try {
            const response = await fetch(`https://api.waifu.pics/${currentCategory}/`);
            const data = await response.json();
            const images = data.files.slice(imagesLoaded, imagesLoaded + count);

            images.forEach(imageUrl => {
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = 'Waifu Image';
                gallery.appendChild(image);
            });

            imagesLoaded += count;
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    // Load initial 5 images on page load
    loadImages(5);

    // Load more images when "More! ❤" button is clicked
    loadMoreButton.addEventListener('click', function() {
        loadImages(5);
    });

    // Update current category when selection changes
    categorySelect.addEventListener('change', function() {
        imagesLoaded = 0;
        currentCategory = categorySelect.value;
        gallery.innerHTML = ''; // Clear existing images
        loadImages(5); // Load new images for selected category
    });
});

