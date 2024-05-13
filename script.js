document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');

    // Scroll navbar using arrow buttons
    document.querySelector('.nav-arrow.left').addEventListener('click', () => {
        navContainer.scrollLeft -= 100; // Adjust scroll amount
    });

    document.querySelector('.nav-arrow.right').addEventListener('click', () => {
        navContainer.scrollLeft += 100; // Adjust scroll amount
    });

    // Show/hide arrow buttons based on scroll position
    navContainer.addEventListener('scroll', () => {
        const maxScrollLeft = navLinks.scrollWidth - navLinks.clientWidth;
        document.querySelector('.nav-arrow.left').style.display = navContainer.scrollLeft > 0 ? 'block' : 'none';
        document.querySelector('.nav-arrow.right').style.display = navContainer.scrollLeft < maxScrollLeft ? 'block' : 'none';
    });
});
