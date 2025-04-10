document.addEventListener('DOMContentLoaded', () => {
    const activeTeamNameDisplay = document.getElementById('active-team-name');
    const guessWordDisplay = document.getElementById('guess-word');
    const tabooWordsList = document.getElementById('taboo-words');
    const startButton = document.getElementById('start-button');
    const correctButton = document.getElementById('correct-button');
    const tabooButton = document.getElementById('taboo-button');
    const passButton = document.getElementById('pass-button');
    const endGameButton = document.getElementById('end-game-button');
    const timerDisplay = document.getElementById('timer');

    let cards = [];
    let currentCard = null;
    let currentTeam = localStorage.getItem('currentTeam') || localStorage.getItem('teamAName') || 'Team A';
    let teamAScore = 0;
    let teamBScore = 0;
    let timeLeft = 60;
    let timerInterval;
    let cardsInPlay = [];
    let teamAGuessedWords = [];
    let teamBGuessedWords = [];
    let teamATabooedWords = [];
    let teamBTabooedWords = [];

import('../data/cards.js')
  .then(module => {
    console.log('Cards loaded:', module.cardsData);  // Add this
    cards = [...module.cardsData];
    cardsInPlay = [...cards];
  })
  .catch(error => {
    console.error("Error loading card data:", error);
  });

    function updateActiveTeamDisplay() {
        activeTeamNameDisplay.textContent = currentTeam;
    }

    function loadNewCard() {
        if (cardsInPlay.length > 0) {
            const randomIndex = Math.floor(Math.random() * cardsInPlay.length);
            currentCard = cardsInPlay.splice(randomIndex, 1)[0];
            guessWordDisplay.textContent = currentCard.guessWord;
            tabooWordsList.innerHTML = '';
            currentCard.tabooWords.forEach(word => {
                const li = document.createElement('li');
                li.textContent = word;
                tabooWordsList.appendChild(li);
            });
        } else {
            alert("No more cards!");
            endGame();
        }
    }

    function startTimer() {
        timeLeft = 60;
        timerDisplay.textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endTurn();
            }
        }, 1000);
        startButton.disabled = true;
        correctButton.disabled = false;
        tabooButton.disabled = false;
        passButton.disabled = false;

        // Load the first card when the timer starts
        if (!currentCard && cardsInPlay.length > 0) { // Ensure there are cards to load
            loadNewCard();
        }
    }

    function endTurn() {
        startButton.disabled = false;
        correctButton.disabled = true;
        tabooButton.disabled = true;
        passButton.disabled = true;
        currentTeam = (currentTeam === localStorage.getItem('teamAName')) ? localStorage.getItem('teamBName') : localStorage.getItem('teamAName');
        localStorage.setItem('currentTeam', currentTeam);
        updateActiveTeamDisplay();
        loadNewCard();
    }

    function handleCorrectGuess() {
        if (currentCard) {
            if (currentTeam === localStorage.getItem('teamAName')) {
                teamAScore++;
                teamAGuessedWords.push(currentCard.guessWord);
            } else {
                teamBScore++;
                teamBGuessedWords.push(currentCard.guessWord);
            }
            loadNewCard();
        }
    }

    function handleTaboo() {
        if (currentCard) {
            if (currentTeam === localStorage.getItem('teamAName')) {
                teamAScore--;
                teamATabooedWords.push(currentCard.guessWord);
            } else {
                teamBScore--;
                teamBTabooedWords.push(currentCard.guessWord);
            }
            loadNewCard();
        }
    }

    function handlePass() {
        if (currentCard) {
            cardsInPlay.push(currentCard);
            loadNewCard();
        }
    }

    function endGame() {
        localStorage.setItem('teamAScore', teamAScore);
        localStorage.setItem('teamBScore', teamBScore);
        localStorage.setItem('teamAGuessedWords', JSON.stringify(teamAGuessedWords));
        localStorage.setItem('teamBGuessedWords', JSON.stringify(teamBGuessedWords));
        localStorage.setItem('teamATabooedWords', JSON.stringify(teamATabooedWords));
        localStorage.setItem('teamBTabooedWords', JSON.stringify(teamBTabooedWords));
        window.location.href = 'score.html';
    }

    startButton.addEventListener('click', startTimer);
    correctButton.addEventListener('click', handleCorrectGuess);
    tabooButton.addEventListener('click', handleTaboo);
    passButton.addEventListener('click', handlePass);
    endGameButton.addEventListener('click', endGame);

    updateActiveTeamDisplay();
});
