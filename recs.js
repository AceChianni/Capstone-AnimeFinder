"use strict"
function getRecommendations() {
    const searchInput = document.getElementById('searchInput').value.trim();
    
    if (searchInput === '') {
        alert('Please enter a genre or title.');
        return;
    }
    
    const query = `
        query ($search: String) {
            Page {
                media(search: $search, type: ANIME) {
                    nodes {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            large
                        }
                        description
                        averageScore
                        genres
                        recommendations {
                            nodes {
                                media {
                                    title {
                                        romaji
                                    }
                                    coverImage {
                                        large
                                    }
                                    genres
                                    averageScore
                                    description
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
    
    const variables = {
        search: searchInput
    };
    
    fetch('https://graphql.anilist.co', {
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
        console.log('API Response:', data); // Log API response for debugging
        
        const animeList = document.getElementById('animeList');
        animeList.innerHTML = ''; // Clear previous results
        
        if (data.data && data.data.Page && data.data.Page.media && data.data.Page.media.nodes.length > 0) {
            const animeData = data.data.Page.media.nodes;
            animeData.forEach(anime => {
                const animeCard = createAnimeCard(anime);
                animeList.appendChild(animeCard);
            });
        } else {
            animeList.innerHTML = '<p>No recommendations found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching anime recommendations:', error);
        alert('Failed to fetch anime recommendations. Please try again.');
    });
}

function createAnimeCard(anime) {
    const animeCard = document.createElement('div');
    animeCard.classList.add('anime-card');
    
    animeCard.innerHTML = `
        <h3>${anime.title.romaji}</h3>
        <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
        <p><strong>Genres:</strong> ${anime.genres.join(', ')}</p>
        <p><strong>Score:</strong> ${anime.averageScore}/100</p>
        <p>${anime.description}</p>
    `;

    if (anime.recommendations && anime.recommendations.nodes.length > 0) {
        const similarAnimeContainer = document.createElement('div');
        similarAnimeContainer.classList.add('similar-anime');
        similarAnimeContainer.innerHTML = '<h4>Similar Titles:</h4>';

        anime.recommendations.nodes.forEach(recommendation => {
            const similarAnimeCard = createAnimeCard(recommendation.media);
            similarAnimeContainer.appendChild(similarAnimeCard);
        });

        animeCard.appendChild(similarAnimeContainer);
    }
    
    return animeCard;
}
