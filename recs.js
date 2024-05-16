"use strict";

let offset = 0;
const limit = 5;

const animeContainer = document.getElementById('animeContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Load initial batch of anime on page load
loadMoreAnime();

loadMoreBtn.addEventListener('click', loadMoreAnime);

function loadMoreAnime() {
    fetchAnimeData(offset, limit)
        .then(animeData => {
            displayAnime(animeData);
            offset += limit;
        })
        .catch(error => {
            console.error('Error fetching anime data:', error);
        });
}

function fetchAnimeData(offset, limit) {
    const query = `
        query ($page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
                media(type: ANIME, sort: SCORE_DESC) {
                    id
                    title {
                        romaji
                    }
                    coverImage {
                        large
                    }
                    description(asHtml: false)
                }
            }
        }
    `;

    const variables = {
        page: Math.floor(offset / limit) + 1,
        perPage: limit
    };

    return fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.data && data.data.Page && data.data.Page.media) {
            return data.data.Page.media;
        } else {
            throw new Error('Invalid data format');
        }
    });
}

function displayAnime(animeData) {
    animeData.forEach(anime => {
        const animeCard = createAnimeCard(anime);
        animeContainer.appendChild(animeCard);
    });
}

function createAnimeCard(anime) {
    const animeCard = document.createElement('div');
    animeCard.classList.add('anime-card');
    
    const title = anime.title.romaji;
    const description = anime.description;
    const imageUrl = anime.coverImage.large;

    animeCard.innerHTML = `
        <h3>${title}</h3>
        <img src="${imageUrl}" alt="${title}">
        <p class="anime-description">${description}</p>
    `;

    // Hide description by default
    const descriptionElement = animeCard.querySelector('.anime-description');
    descriptionElement.style.display = 'none';

    // Show description on hover
    animeCard.addEventListener('mouseenter', () => {
        descriptionElement.style.display = 'block';
    });

    // Hide description when not hovered
    animeCard.addEventListener('mouseleave', () => {
        descriptionElement.style.display = 'none';
    });

    return animeCard;
}



// "use strict"
// let offset = 0;
// const limit = 5;

// const animeContainer = document.getElementById('animeContainer');
// const loadMoreBtn = document.getElementById('loadMoreBtn');

// // Load initial batch of anime on page load
// loadMoreAnime();

// loadMoreBtn.addEventListener('click', loadMoreAnime);

// function loadMoreAnime() {
//     fetchAnimeData(offset, limit)
//         .then(animeData => {
//             displayAnime(animeData);
//             offset += limit;
//         })
//         .catch(error => {
//             console.error('Error fetching anime data:', error);
//         });
// }

// function fetchAnimeData(offset, limit) {
//     const query = `
//         query ($page: Int, $perPage: Int) {
//             Page(page: $page, perPage: $perPage) {
//                 media(type: ANIME, sort: SCORE_DESC) {
//                     id
//                     title {
//                         romaji
//                     }
//                     coverImage {
//                         large
//                     }
//                     description(asHtml: false)
//                 }
//             }
//         }
//     `;

//     const variables = {
//         page: Math.floor(offset / limit) + 1,
//         perPage: limit
//     };

//     return fetch('https://graphql.anilist.co', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             query: query,
//             variables: variables
//         })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data.data && data.data.Page && data.data.Page.media) {
//             return data.data.Page.media;
//         } else {
//             throw new Error('Invalid data format');
//         }
//     });
// }

// function displayAnime(animeData) {
//     animeData.forEach(anime => {
//         const animeCard = createAnimeCard(anime);
//         animeContainer.appendChild(animeCard);
//     });
// }

// function createAnimeCard(anime) {
//     const animeCard = document.createElement('div');
//     animeCard.classList.add('anime-card');
    
//     animeCard.innerHTML = `
//         <h3>${anime.title.romaji}</h3>
//         <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
//         <p class="anime-description">${anime.description}</p>
//     `;
    
//     animeCard.addEventListener('click', () => {
//         animeCard.classList.toggle('show-description');
//     });

//     return animeCard;
// }
