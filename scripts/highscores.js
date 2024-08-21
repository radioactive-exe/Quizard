const highScoresList = document.getElementById('high-scores-list');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map( score => `<li class="high-score-entry"> <div class="entry-name">${score.name}</div> <div class="entry-score">${score.score} pts</div></li>`).join('');