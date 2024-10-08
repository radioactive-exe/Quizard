const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const choiceLabels = Array.from(
    document.getElementsByClassName("choice-label")
);

var correctChoice;

const game = document.getElementById('game');
const loader = document.getElementById('loader-container');
const errorHeader = document.getElementById('error-header');

const counterText = document.getElementById("question-number");
const scoreText = document.getElementById("score");
const progressBarFill = document.getElementById("progress-bar-fill");

const darkLightCheck = document.getElementById("dark-light-check");

let numOfRetries = 0;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// let questions = [
//     {
//         question: "Inside which HTML element do we put the JavaScript?",
//         choice1: "<script>",
//         choice2: "<javascript>",
//         choice3: "<js>",
//         choice4: "<scripting>",
//         answer: 1,
//     },
//     {
//         question:
//             "What is the correct syntax for referring to an external script called 'xxx.js'?",
//         choice1: "<script href='xxx.js'>",
//         choice2: "<script name='xxx.js'>",
//         choice3: "<script src='xxx.js'>",
//         choice4: "<script file='xxx.js'>",
//         answer: 3,
//     },
//     {
//         question: " How do you write 'Hello World' in an alert box?",
//         choice1: "msgBox('Hello World');",
//         choice2: "alertBox('Hello World');",
//         choice3: "msg('Hello World');",
//         choice4: "alert('Hello World');",
//         answer: 4,
//     },
// ];

// Constants

var questions = [];



const CORRECT_BONUS = 10;
let MAX_QUESTIONS = 20;

startGame = () => {
    MAX_QUESTIONS = Number(JSON.parse(localStorage.getItem('config')).quantity, 10);
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    acceptingAnswers = false;
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
    errorHeader.classList.add('hidden');
};

getNewQuestion = () => {
    questionCounter++;
    counterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];
    progressBarFill.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    document.querySelector('#difficulty').innerText = currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1);
    document.querySelector('#category').innerText = getLabelForm(currentQuestion.category);

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.parentElement.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        correctChoice = document.querySelector(".choice-text[data-number=\"" + currentQuestion.answer + "\"]");
        correctChoice.classList.add("correct");


        // const soundToPlay = selectedAnswer == currentQuestion.answer ? "../assets/correct-ding.mp3" : "../assets/incorrect-ding.wav"; 
        if (classToApply == "correct") incrementScore(CORRECT_BONUS);

        selectedChoice.parentElement
            .getElementsByClassName("choice-text")[0]
            .classList.add(classToApply);
        // const audioItem = new Audio(soundToPlay);
        // audioItem.play();

        if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("lastScore", score);
            setTimeout(() => {
                transitionElement.classList.add("is-active");
            }, 200);
            let x = (e.clientX / innerWidth) * 100;
            let y = (e.clientY / innerHeight) * 100;

            root.style.setProperty("--mouse-x", x + "%");
            root.style.setProperty("--mouse-y", y + "%");

            setTimeout(() => {
                return window.location.assign("end.html");
            }, 1000);
        }
        setTimeout(() => {
            selectedChoice.parentElement
                .getElementsByClassName("choice-text")[0]
                .classList.remove(classToApply);
            correctChoice.classList.remove("correct");
            if (availableQuestions.length != 0 && questionCounter < MAX_QUESTIONS)
                getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

htmlToString = (html) => {
	var t = document.createElement('textarea');
	t.innerHTML = html;
	return t.value;
}

checkForDarkMode(); 

// ! Open Trivia link: https://opentdb.com/api.php?amount=150&category=9&difficulty=easy&type=multiple

// ! Trivia link 2: https://the-trivia-api.com/v2/questions?difficulties=easy,medium&categories=general_knowledge&types=text_choice

init = () => {
    const config = JSON.parse(localStorage.getItem('config'));
fetch('https://the-trivia-api.com/v2/questions?difficulties=' + config.difficulties + '&categories=' + config.categories +'&types=text_choice&limit=' + config.quantity)
    .then( res => {
        if (numOfRetries >= 10) {
            errorHeader.classList.remove('hidden');
        }
        if (!res.ok) {
            setTimeout(() => {
                numOfRetries++;
                init();
            }, 10000);
        }
        return res.json();
    })
    .then( data => {
        questions = data.map( questionItem => {
            const formattedQuestion = {
                question: htmlToString(questionItem.question.text),
                difficulty: questionItem.difficulty,
                category: questionItem.category

                // ? answer: 
                // ? choice[1-4]:
                // * The choices will be spread here
            }

            const answerChoices = [...questionItem.incorrectAnswers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, questionItem.correctAnswer)

            answerChoices.forEach((item, index) => {
                formattedQuestion['choice' + (index+ 1)] = htmlToString(item);
            })

            return formattedQuestion;
        });
        startGame();
    })
    .catch( error => {
        console.log(error);
    })
}

getLabelForm = (s) => {
    switch (s) {
        case 'food_and_drink': return 'Food & Drink';
        case 'music': return 'Music';
        case 'arts_and_literature': return 'Arts & Literature';
        case 'sport_and_leisure': return 'Sports & Leisure';
        case 'science': return 'Science';
        case 'history': return 'History';
        case 'film_and_tv': return 'Film & TV';
        case 'society_and_culture': return 'Society & Culture';
        case 'geography': return 'Geography';
    }
    return 'General Knowledge';
}

document.addEventListener('DOMContentLoaded', () => {
        const cont = document.querySelector('#loader-container');
        for (let i = 0; i < 4; i++) {
            let loader = document.createElement('div');
            loader.classList.add('loader-1');
            loader.style.setProperty('--i',i);
            for (let j = 1; j < 21; j++) {
                let span = document.createElement('span');
                span.classList.add('loader-1-span');
                span.style.setProperty('--j',j);
                loader.appendChild(span);
            }
            cont.appendChild(loader);
        }
    })


init();

// IDEA: Why for(int x = 1)
/* * choiceLabels.forEach( label => {
    label.parentElement.addEventListener('mouseenter', e => {
        label.dispatchEvent(new Event('mouseenter'));
    })
    label.parentElement.addEventListener('mouseleave', e => {
        label.dispatchEvent(new Event('mouseleave'));
    })
}) */

// startGame();
