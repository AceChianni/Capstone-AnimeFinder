"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('loadMore');
    const apiUrl = 'https://api.waifu.pics/sfw/waifu';
    let isLoading = false;

    async function fetchWaifuImage() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async function loadImages(count = 6) {
        if (isLoading) return;
        isLoading = true;
        for (let i = 0; i < count; i++) {
            const imageUrl = await fetchWaifuImage();
            if (imageUrl) {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                gallery.appendChild(imgElement);
            }
        }
        isLoading = false;
    }

    loadMoreButton.addEventListener('click', () => {
        loadImages();
    });

    // Initial load
    loadImages();
});
