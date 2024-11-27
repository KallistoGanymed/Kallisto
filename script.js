// script.js

// Joke Generator
const jokes = [
    "Warum können Geister so schlecht lügen? Weil man durch sie hindurchsehen kann!",
    "Was macht ein Pirat am Computer? Er drückt die Enter-Taste!",
    "Warum können Bäcker so gut flirten? Weil sie süß sind!",
];
document.getElementById('joke-btn').addEventListener('click', () => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    document.getElementById('joke-text').textContent = randomJoke;
});

// Poll Logic
const pollForm = document.getElementById('poll-form');
const pollResults = document.getElementById('poll-results');
const yesPercentage = document.getElementById('yes-percentage');
const noPercentage = document.getElementById('no-percentage');

// Retrieve poll data from localStorage
const pollData = JSON.parse(localStorage.getItem('pollData')) || { yes: 0, no: 0 };

function updatePollResults() {
    const totalVotes = pollData.yes + pollData.no;
    if (totalVotes > 0) {
        yesPercentage.textContent = `${Math.round((pollData.yes / totalVotes) * 100)}%`;
        noPercentage.textContent = `${Math.round((pollData.no / totalVotes) * 100)}%`;
    }
}

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedOption = document.querySelector('input[name="poll"]:checked');
    if (selectedOption) {
        pollData[selectedOption.value]++;
        localStorage.setItem('pollData', JSON.stringify(pollData));
        pollForm.classList.add('hidden');
        pollResults.classList.remove('hidden');
        updatePollResults();
    } else {
        alert('Bitte wählen Sie eine Option aus!');
    }
});

// Display results if already voted
if (pollData.yes > 0 || pollData.no > 0) {
    pollForm.classList.add('hidden');
    pollResults.classList.remove('hidden');
    updatePollResults();
}
