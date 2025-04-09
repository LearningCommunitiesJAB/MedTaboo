document.addEventListener('DOMContentLoaded', () => {
    const teamAFinalScoreDisplay = document.getElementById('team-a-final-score');
    const teamBFinalScoreDisplay = document.getElementById('team-b-final-score');
    const teamACorrectWordsDisplay = document.getElementById('team-a-correct-words');
    const teamBCorrectWordsDisplay = document.getElementById('team-b-correct-words');
    const teamATabooedWordsDisplay = document.getElementById('team-a-tabooed-words');
    const teamBTabooedWordsDisplay = document.getElementById('team-b-tabooed-words');
    const playAgainButton = document.getElementById('play-again-button');

    const teamAName = localStorage.getItem('teamAName');
    const teamBName = localStorage.getItem('teamBName');
    const teamAScore = parseInt(localStorage.getItem('teamAScore')) || 0;
    const teamBScore = parseInt(localStorage.getItem('teamBScore')) || 0;
    const teamAGuessedWords = JSON.parse(localStorage.getItem('teamAGuessedWords')) || [];
    const teamBGuessedWords = JSON.parse(localStorage.getItem('teamBGuessedWords')) || [];
    const teamATabooedWords = JSON.parse(localStorage.getItem('teamATabooedWords')) || [];
    const teamBTabooedWords = JSON.parse(localStorage.getItem('teamBTabooedWords')) || [];

    teamAFinalScoreDisplay.textContent = `${teamAName}: ${teamAScore}`;
    teamBFinalScoreDisplay.textContent = `${teamBName}: ${teamBScore}`;
    teamACorrectWordsDisplay.textContent = teamAGuessedWords.join(', ');
    teamBCorrectWordsDisplay.textContent = teamBGuessedWords.join(', ');
    teamATabooedWordsDisplay.textContent = teamATabooedWords.join(', ');
    teamBTabooedWordsDisplay.textContent = teamBTabooedWords.join(', ');

    playAgainButton.addEventListener('click', () => {
        localStorage.removeItem('teamAScore');
        localStorage.removeItem('teamBScore');
        localStorage.removeItem('teamAGuessedWords');
        localStorage.removeItem('teamBGuessedWords');
        localStorage.removeItem('teamATabooedWords');
        localStorage.removeItem('teamBTabooedWords');
        localStorage.removeItem('currentTeam');
        window.location.href = 'index.html';
    });
});
