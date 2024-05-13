
// anime slider (autoplay)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    // Hide the current slide
    slides[currentSlide].style.transform = 'translateX(-100%)';

    // Update currentSlide index
    currentSlide = (currentSlide + 1) % slides.length;

    // Display the next slide
    slides[currentSlide].style.transform = 'translateX(0)';
}

// Autoplay the slider every 5 seconds
setInterval(nextSlide, 5000);
// end of gallery 


const quizQuestions = [
    {
        question: "What genre of TV shows do you enjoy the most?",
        options: ["Drama", "Comedy", "Action", "Fantasy", "Science Fiction"]
    },
    {
        question: "Which type of characters do you prefer?",
        options: ["Serious and deep", "Funny and quirky", "Brave and adventurous", "Magical and mystical", "Intelligent and innovative"]
    },
    {
        question: "What kind of storyline do you find most intriguing?",
        options: ["Emotionally gripping", "Light-hearted and humorous", "Full of thrilling battles", "Involving supernatural elements", "Exploring futuristic concepts"]
    }
];

let userAnswers = [];

function startQuiz() {
    const quizContainer = document.getElementById('quizContainer');

    quizQuestions.forEach((questionObj, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p>${index + 1}. ${questionObj.question}</p>
            <select id="answer${index}">
                ${questionObj.options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
        `;
        quizContainer.appendChild(questionElement);
    });
}

async function fetchAnimeRecommendation() {
    const query = userAnswers.join(' ').toLowerCase();

    const apiUrl = `https://api.jikan.moe/v4/anime/search?q=${query}&limit=1`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.anime && data.anime.length > 0) {
            const anime = data.anime[0]; // Get the first anime from the list

            const recommendationContainer = document.getElementById('recommendationContainer');
            recommendationContainer.innerHTML = ''; // Clear previous result

            const recommendationElement = document.createElement('div');
            recommendationElement.innerHTML = `
                <h2>Recommended Anime:</h2>
                <h3>${anime.title}</h3>
                <img src="${anime.cover_image}" alt="${anime.title}" />
                <p>Score: ${anime.average_score}</p>
                <p>Episodes: ${anime.total_episodes}</p>
                <button onclick="showTrailer('${anime.title}', '${anime.trailer_url}')">Watch Trailer</button>
            `;
            recommendationContainer.appendChild(recommendationElement);

            recommendationContainer.style.display = 'block'; // Show the recommendation
        } else {
            alert('No anime found. Please try again with different preferences.');
        }
    } catch (error) {
        console.error('Error fetching anime data:', error);
        alert('Failed to fetch anime recommendation. Please try again later.');
    }
}

function submitQuiz() {
    userAnswers = [];

    quizQuestions.forEach((questionObj, index) => {
        const answer = document.getElementById(`answer${index}`).value;
        userAnswers.push(answer);
    });

    fetchAnimeRecommendation();
}

function showTrailer(title, trailerUrl) {
    if (trailerUrl) {
        window.open(trailerUrl, '_blank');
    } else {
        alert(`Sorry, no trailer available for ${title}`);
    }
}

// Initialize the quiz when the page loads
startQuiz();
