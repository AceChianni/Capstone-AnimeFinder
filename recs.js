"use strict"
let offset = 0;
const limit = 5;

const animeContainer = document.getElementById('animeContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');

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
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.innerHTML = `
            <h3>${anime.title.romaji}</h3>
            <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
            <p>${anime.description}</p>
        `;
        animeContainer.appendChild(animeCard);
    });
}
