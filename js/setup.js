document.addEventListener('DOMContentLoaded', () => {
    const teamANameInput = document.getElementById('team-a-name');
    const teamBNameInput = document.getElementById('team-b-name');
    const deckSelect = document.getElementById('deck');   // <-- ADD THIS
    const nextButton = document.getElementById('next-button');

    nextButton.addEventListener('click', () => {
        const teamAName = teamANameInput.value.trim();
        const teamBName = teamBNameInput.value.trim();

        if (teamAName && teamBName) {
            localStorage.setItem('teamAName', teamAName);
            localStorage.setItem('teamBName', teamBName);

            // Save selected deck
            localStorage.setItem('selectedDeck', deckSelect.value);

            window.location.href = 'rules.html';
        } else {
            alert('Please enter names for both teams.');
        }
    });
});
