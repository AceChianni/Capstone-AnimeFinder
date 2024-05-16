"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const categoryButtons = document.querySelectorAll('.categoryButton');
    let imagesLoaded = 0;
    let currentCategory = 'sfw'; // Default category

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

            // Show the "More! ❤" button after images are loaded
            loadMoreButton.style.display = 'block';
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const clearGallery = () => {
        gallery.innerHTML = '';
        imagesLoaded = 0;
        loadMoreButton.style.display = 'none'; // Hide "More! ❤" button when gallery is cleared
    };

    // Load initial images on page load
    loadImages(5);

    // Event listener for category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            if (selectedCategory !== currentCategory) {
                clearGallery(); // Clear existing images if category changes
                currentCategory = selectedCategory;
                loadImages(5); // Load images for the new category
            }
        });
    });

    // Load more images when "More! ❤" button is clicked
    loadMoreButton.addEventListener('click', function() {
        loadImages(5);
    });
});

