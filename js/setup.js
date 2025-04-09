document.addEventListener('DOMContentLoaded', () => {
    const teamANameInput = document.getElementById('team-a-name');
    const teamBNameInput = document.getElementById('team-b-name');
    const nextButton = document.getElementById('next-button');

    nextButton.addEventListener('click', () => {
        const teamAName = teamANameInput.value.trim();
        const teamBName = teamBNameInput.value.trim();

        if (teamAName && teamBName) {
            // Store team names (we'll use localStorage for simplicity in this example)
            localStorage.setItem('teamAName', teamAName);
            localStorage.setItem('teamBName', teamBName);

            // Navigate to the rules screen
            window.location.href = 'rules.html';
        } else {
            alert('Please enter names for both teams.');
        }
    });
});
