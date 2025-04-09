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
    let currentTeam = localStorage.getItem('currentTeam') || localStorage.getItem('teamAName') || 'Team A'; // Default to Team A initially
    let teamAScore = 0;
    let teamBScore = 0;
    let timeLeft = 60;
    let timerInterval;
    let cardsInPlay = [];
    let teamAGuessedWords = [];
    let teamBGuessedWords = [];
    let teamATabooedWords = [];
    let teamBTabooedWords = [];

    // Load card data
    import('../data/cards.js').then(module => {
        cards = [...module.cardsData]; // Create a copy so we can remove played cards
        cardsInPlay = [...cards];
        loadNewCard();
    }).catch(error => {
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
            endGame(); // Or handle the end of the deck differently
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
        if (!currentCard) { // Only load if a card hasn't been loaded yet
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
        loadNewCard(); // Load a new card for the next team's turn
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
            loadNewCard(); // This line should load the next card
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
            loadNewCard(); // This line should load the next card
        }
    }

    function handlePass() {
        if (currentCard) {
            cardsInPlay.push(currentCard); // Put the card back
            loadNewCard(); // This line should load the next card
        }
    }

    correctButton.addEventListener('click', handleCorrectGuess);
    tabooButton.addEventListener('click', handleTaboo);
    passButton.addEventListener('click', handlePass);

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
            endGame(); // Or handle the end of the deck differently
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

    // Initial setup
    updateActiveTeamDisplay();
});
