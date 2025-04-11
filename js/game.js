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
    let hasPassed = false;

    // Load card data
    import('./data/cards.js')
      .then(module => {
        console.log('Cards loaded:', module.cardsData);  // Debugging: Log loaded cards
        cards = [...module.cardsData];
        cardsInPlay = [...cards];
        console.log('Cards in play:', cardsInPlay);  // Debugging: Check if cards are populated correctly

        // Enable the start button and prepare game
        startButton.disabled = false;  // Enable start button after cards are loaded
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
            console.log('New card loaded:', currentCard);  // Debugging: Log current card details
        } else {
            alert("No more cards!");
            endGame();
        }
    }

function startTimer() {
    // If a card is currently showing, return it to the pool
    if (currentCard) {
        cardsInPlay.push(currentCard);
        currentCard = null;
    }

    // Load a new card for the round
    if (cardsInPlay.length > 0) {
        loadNewCard();
    } else {
        alert("No more cards!");
        endGame();
        return;
    }

    console.log('Timer started');
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endTurn(); // Timer's up
        }
    }, 1000);

    startButton.disabled = true;
    correctButton.disabled = false;
    tabooButton.disabled = false;
    passButton.disabled = false;

    // Optional: Disable Pass after one use if you're still doing that
    passUsed = false;
    passButton.disabled = false;
}


function endTurn() {
    startButton.disabled = false;
    correctButton.disabled = true;
    tabooButton.disabled = true;
    passButton.disabled = false;  // Re-enable the Pass button for the next round
    hasPassed = false;  // Reset the "hasPassed" flag for the next round

    currentTeam = (currentTeam === localStorage.getItem('teamAName')) ? localStorage.getItem('teamBName') : localStorage.getItem('teamAName');
    localStorage.setItem('currentTeam', currentTeam);
    updateActiveTeamDisplay();
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
    if (!hasPassed) {  // Only allow one pass per round
        if (currentCard) {
            cardsInPlay.push(currentCard);
            loadNewCard();  // Load a new card
            hasPassed = true;  // Mark that the pass button has been used
            passButton.disabled = true;  // Disable the Pass button
        }
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

    startButton.addEventListener('click', () => {
        console.log('Start button clicked');  // Debugging: Confirm start button is clicked
        startTimer();
    });
    correctButton.addEventListener('click', handleCorrectGuess);
    tabooButton.addEventListener('click', handleTaboo);
    passButton.addEventListener('click', handlePass);
    endGameButton.addEventListener('click', endGame);

    updateActiveTeamDisplay();
});
