const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const choiceLabels = Array.from(
    document.getElementsByClassName("choice-label")
);

const game = document.getElementById('game');
const loader = document.getElementById('loader');

const counterText = document.getElementById("question-number");
const scoreText = document.getElementById("score");
const progressBarFill = document.getElementById("progress-bar-fill");

const darkLightCheck = document.getElementById("dark-light-check");

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
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    acceptingAnswers = false;
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
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
        if (classToApply == "correct") incrementScore(CORRECT_BONUS);

        selectedChoice.parentElement
            .getElementsByClassName("choice-text")[0]
            .classList.add(classToApply);

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

fetch('https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple')
    .then( res => {
        return res.json();
    })
    .then( data => {
        questions = data.results.map( questionItem => {
            const formattedQuestion = {
                question: htmlToString(questionItem.question)

                // ? answer: 
                // ? choice[1-4]:
                // * The choices will be spread here
            }

            const answerChoices = [...questionItem.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, questionItem.correct_answer)

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
