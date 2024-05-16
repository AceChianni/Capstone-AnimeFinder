document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('loadMoreButton');
    let imagesLoaded = 0;

    const loadImages = (count) => {
        for (let i = 0; i < count; i++) {
            const image = document.createElement('img');
            image.src = `path_to_your_image/image${imagesLoaded + i + 1}.jpg`; // Adjust image path
            image.alt = `Image ${imagesLoaded + i + 1}`;
            gallery.appendChild(image);
        }
        imagesLoaded += count;
    };

    // Load initial 5 images on page load
    loadImages(5);

    // Load 5 more images when "More! ❤" button is clicked
    loadMoreButton.addEventListener('click', function() {
        loadImages(5);
    });
});
