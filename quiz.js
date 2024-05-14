"use strict"
const GENRE_IDS = {
    "Drama": "Drama",
    "Comedy": "Comedy",
    "Action": "Action",
    "Fantasy": "Fantasy",
    "Science Fiction": "Sci-Fi",
    "Serious and deep": "Drama",
    "Funny and quirky": "Comedy",
    "Brave and adventurous": "Adventure",
    "Magical and mystical": "Fantasy",
    "Intelligent and innovative": "Sci-Fi",
    "Emotionally gripping": "Drama",
    "Light-hearted and humorous": "Comedy",
    "Full of thrilling battles": "Action",
    "Involving supernatural elements": "Supernatural",
    "Exploring futuristic concepts": "Sci-Fi",
    "Urban cityscape": "Slice of Life",
    "Rural countryside": "Slice of Life",
    "Fantasy world": "Fantasy",
    "Outer space": "Sci-Fi",
    "Historical era": "Historical",
    "Serious and intense": "Drama",
    "Light-hearted and fun": "Comedy",
    "Mysterious and suspenseful": "Mystery",
    "Whimsical and magical": "Fantasy",
    "Futuristic and innovative": "Sci-Fi"
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

    const genreNames = selectedGenres.map(genre => GENRE_IDS[genre]);
    const uniqueGenreNames = [...new Set(genreNames)];
    
    const query = `
        query ($genres: [String]) {
            Page(perPage: 5) {
                media(genre_in: $genres, type: ANIME, sort: POPULARITY_DESC) {
                    title {
                        romaji
                    }
                    coverImage {
                        large
                    }
                    description
                    siteUrl
                }
            }
        }
    `;

    const variables = {
        genres: uniqueGenreNames,
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
            <a href="${anime.siteUrl}" target="_blank">More Info</a>
        `;
        recommendations.appendChild(animeItem);
    });

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Restart Quiz';
    resetButton.onclick = resetQuiz;
    recommendations.appendChild(resetButton);
}

function resetQuiz() {
    document.getElementById('quizForm').reset();
    document.getElementById('quizForm').style.display = 'block';
    document.getElementById('recommendationContainer').style.display = 'none';

    const questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        if (index === 0) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    });
}
