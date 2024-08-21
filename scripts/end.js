const username = document.getElementById('username');
const submitScoreButton = document.getElementById('submit-score-button');
const finalScoreText = document.getElementById('final-score');
const finalScore = JSON.parse(localStorage.getItem('lastScore')) || 0;

const MAX_HIGH_SCORES = 5;

finalScoreText.innerText = finalScore;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

username.addEventListener('keyup', e => {
    submitScoreButton.disabled = !username.value;
})

submitHighScore = (e) => {
    e.preventDefault();

    const scoreEntry = {
        name : username.value,
        score : finalScore
    }

    highScores.push(scoreEntry);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    transitionElement.classList.add('is-active');
    let x = e.clientX / innerWidth * 100;
    let y = e.clientY / innerHeight * 100;
    
    root.style.setProperty('--mouse-x', x + "%");
    root.style.setProperty('--mouse-y', y + "%");

    setTimeout(() => {
        window.location.assign('index.html');
    }, 800);
}