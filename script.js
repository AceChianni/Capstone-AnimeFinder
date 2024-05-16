"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const slidesContainer = document.getElementById('slides');
    let currentSlide = 0;

    // Function to fetch XML data
    async function fetchXMLData(url) {
        const response = await fetch(url);
        const textData = await response.text();
        const parser = new DOMParser();
        return parser.parseFromString(textData, "application/xml");
    }

    // Function to convert XML data to JSON format
    function xmlToJson(xml) {
        const obj = {};
        if (xml.nodeType === 1) { // element
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue;
        }

        if (xml.hasChildNodes()) {
            for(let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;
                if (typeof(obj[nodeName]) === "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) === "undefined") {
                        const old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    }

    // Function to create slides from data
    function createSlides(data) {
        const animeList = data.report.item; // Adjust based on actual XML structure
        animeList.forEach((anime, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.innerHTML = `
                <h2>${anime.name}</h2>
                <img src="${anime.image}" alt="${anime.name}">
                <p>${anime.description}</p>
            `;
            if (index === 0) {
                slide.style.display = 'block';
            }
            slidesContainer.appendChild(slide);
        });
    }

    // Function to show a specific slide
    function showSlide(slideIndex) {
        const slides = document.querySelectorAll('.slide');
        if (slideIndex >= slides.length) {
            currentSlide = 0;
        } else if (slideIndex < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = slideIndex;
        }

        slides.forEach((slide, index) => {
            slide.style.display = index === currentSlide ? 'block' : 'none';
        });
    }

    // Change slide
    window.changeSlide = function(n) {
        showSlide(currentSlide + n);
    }

    // Fetch and display data
    const url = "https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&nskip=0&nlist=10"; // Adjust based on actual URL and parameters
    fetchXMLData(url).then(xmlData => {
        const jsonData = xmlToJson(xmlData);
        createSlides(jsonData);
    }).catch(error => console.error("Failed to fetch data:", error));

    showSlide(currentSlide);
});


// document.addEventListener("DOMContentLoaded", function() {
//     const slides = document.querySelectorAll(".slide");
//     let currentSlide = 0;
//     let slideshowInterval;

//     // Function to show a specific slide
//     function showSlide(slideIndex) {
//         slides.forEach((slide, index) => {
//             slide.style.display = index === slideIndex ? "block" : "none";
//         });
//     }

//     // Function to show the next slide
//     function nextSlide() {
//         currentSlide = (currentSlide + 1) % slides.length;
//         showSlide(currentSlide);
//     }

//     // Function to show the previous slide
//     function prevSlide() {
//         currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//         showSlide(currentSlide);
//     }

//     // Function to toggle slideshow play/pause
//     function toggleSlideShow() {
//         if (slideshowInterval) {
//             clearInterval(slideshowInterval);
//             slideshowInterval = null;
//         } else {
//             slideshowInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
//         }
//     }

//     // Initial setup: show the first slide and start slideshow
//     showSlide(currentSlide);
//     slideshowInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds 

//     // Event listener for slideshow controls
//     slides.forEach(slide => {
//         slide.addEventListener("click", function(event) {
//             const slideWidth = slide.offsetWidth;
//             const clickX = event.offsetX;

//             if (clickX < slideWidth * 0.3) {
//                 prevSlide();
//             } else if (clickX > slideWidth * 0.7) {
//                 nextSlide();
//             } else {
//                 toggleSlideShow();
//             }
//         });
//     });

    // Poll functionality
    const pollForm = document.querySelector("#animePoll");
    const pollResultsContainer = document.querySelector("#pollResults");
    const choices = {}; // Track poll choices

    // Update poll results display
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

    // Submit poll form
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
