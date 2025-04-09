document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');

    playButton.addEventListener('click', () => {
        // Navigate to the game screen
        window.location.href = 'game.html';
    });
});
