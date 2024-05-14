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
                const animeCard = document.createElement('div');
                animeCard.classList.add('anime-card');
                
                animeCard.innerHTML = `
                    <h3>${anime.title.romaji}</h3>
                    <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
                    <p><strong>Genres:</strong> ${anime.genres.join(', ')}</p>
                    <p><strong>Score:</strong> ${anime.averageScore}/100</p>
                    <p>${anime.description}</p>
                `;
                
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
