//  "fake" authentication
// password
const password = "play";
let authenticated = false;
//  Loop until user enters the right password
while (!authenticated) {
    const userInput = prompt("Enter 'play' to start the quiz");
// Check if the password matches
    if (userInput === password) {
        authenticated = true;
// Call function to start the quiz
        startQuiz();
    } else {
        alert("Incorrect password. Please try again.");
    }
}
// function Quiz questions and answers
function startQuiz() {
// questions
    const questions = [
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Earth", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Venus", correct: false },
            ]
        },
        {
            question: "What is the chemical symbol for gold?",
            answers: [
                { text: "Go", correct: false },
                { text: "Au", correct: true },
                { text: "Ag", correct: false },
                { text: "Pt", correct: false },
            ]
        },
        {
            question: "Who wrote the play Romeo and Juliet?",
            answers: [
                { text: "William Shakespeare", correct: true },
                { text: "Charles Dickens", correct: false },
                { text: "Jane Austen", correct: false },
                { text: "Mark Twain", correct: false },
            ]
        },
        {
            question: "What is the largest mammal on Earth?",
            answers: [
                { text: "Blue whale", correct: true },
                { text: "African elephant", correct: false },
                { text: "Giraffe", correct: false },
                { text: "Hippopotamus", correct: false },
            ]
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            answers: [
                { text: "China", correct: false },
                { text: "Japan", correct: true },
                { text: "Korea", correct: false },
                { text: "Vietnam", correct: false },
            ]
        },
        {
            question: "What is the main ingredient in guacamole?",
            answers: [
                { text: "Avocado", correct: true },
                { text: "Tomato", correct: false },
                { text: "Onion", correct: false },
                { text: "Lime", correct: false },
            ]
        },
    ];

    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");

    let currentQuestionIndex = 0;
    let score = 0;
// function start quiz and display first question
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
    }
// Display question and answer buttons
    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + "." + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        });
    }

    function resetState() {
        nextButton.style.display = "none";
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }
// selecting an answer
    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }
//  Display final score and option to play again
    function showScore() {
        resetState();
        questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;

        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", () => {
            currentQuestionIndex = 0;
            score = 0;
            showQuestion();
        });
    }
// moving to the next question
    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    nextButton.addEventListener("click", handleNextButton);
// start over
    startQuiz();
}
