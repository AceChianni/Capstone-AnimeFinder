"use strict"
const GENRE_IDS = {
    "Drama": 8,
    "Comedy": 4,
    "Action": 1,
    "Fantasy": 10,
    "Science Fiction": 24,
    "Serious and deep": 8, // Drama
    "Funny and quirky": 4, // Comedy
    "Brave and adventurous": 2, // Adventure
    "Magical and mystical": 10, // Fantasy
    "Intelligent and innovative": 24, // Sci-Fi
    "Emotionally gripping": 8, // Drama
    "Light-hearted and humorous": 4, // Comedy
    "Full of thrilling battles": 1, // Action
    "Involving supernatural elements": 37, // Supernatural
    "Exploring futuristic concepts": 24, // Sci-Fi
    "Urban cityscape": 8, // Drama (as an example)
    "Rural countryside": 4, // Comedy (as an example)
    "Fantasy world": 10, // Fantasy
    "Outer space": 24, // Sci-Fi
    "Historical era": 13, // Historical
    "Serious and intense": 8, // Drama
    "Light-hearted and fun": 4, // Comedy
    "Mysterious and suspenseful": 7, // Mystery
    "Whimsical and magical": 10, // Fantasy
    "Futuristic and innovative": 24, // Sci-Fi
};

function showNextQuestion(currentQuestionId) {
    const currentQuestion = document.getElementById(currentQuestionId);
    const radioButtons = currentQuestion.querySelectorAll('input[type="radio"]');
    let answered = false;

    for (let radio of radioButtons) {
        if (radio.checked) {
            answered = true;
            break;
        }
    }

    if (answered) {
        currentQuestion.style.display = 'none';
        const nextQuestion = currentQuestion.nextElementSibling;
        if (nextQuestion) {
            nextQuestion.style.display = 'block';
        }
    } else {
        alert('Please answer the question before proceeding.');
    }
}

async function submitQuiz() {
    const questions = document.querySelectorAll('.question');
    let allAnswered = true;
    const selectedGenres = [];

    questions.forEach((question) => {
        const radioButtons = question.querySelectorAll('input[type="radio"]');
        let answered = false;
        for (let radio of radioButtons) {
            if (radio.checked) {
                answered = true;
                selectedGenres.push(radio.value);
                break;
            }
        }
        if (!answered) {
            allAnswered = false;
        }
    });

    if (allAnswered) {
        document.getElementById('quizForm').style.display = 'none';
        document.getElementById('recommendationContainer').style.display = 'block';
        await fetchRecommendations(selectedGenres);
    } else {
        alert('Please answer all questions before submitting.');
    }
}

async function fetchRecommendations(selectedGenres) {
    const recommendations = document.getElementById('recommendationContainer');
    recommendations.innerHTML = '<p>Loading recommendations...</p>';

    const genreIds = selectedGenres.map(genre => GENRE_IDS[genre]);
    const uniqueGenreIds = [...new Set(genreIds)];
    
    const query = `
        query ($genreIds: [Int]) {
            Page(perPage: 5) {
                media(genre_in: $genreIds, type: ANIME) {
                    title {
                        romaji
                    }
                    coverImage {
                        large
                    }
                    description
                }
            }
        }
    `;

    const variables = {
        genreIds: uniqueGenreIds,
    };

    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        });
        
        const data = await response.json();

        if (data.data.Page.media.length > 0) {
            displayRecommendations(data.data.Page.media);
        } else {
            recommendations.innerHTML = '<p>No recommendations found based on your preferences. Please try again with different options.</p>';
        }
    } catch (error) {
        recommendations.innerHTML = '<p>Failed to fetch recommendations. Please try again later.</p>';
        console.error('Error fetching recommendations:', error);
    }
}

function displayRecommendations(animeList) {
    const recommendations = document.getElementById('recommendationContainer');
    recommendations.innerHTML = '<h2>Recommended Anime</h2>';

    animeList.forEach(anime => {
        const animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        animeItem.innerHTML = `
            <h3>${anime.title.romaji}</h3>
            <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
            <p>${anime.description}</p>
        `;
        recommendations.appendChild(animeItem);
    });
}
