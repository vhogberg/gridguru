// scripts/script.js

// Global variables for current question index, the score, and a array of questions
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Function to fetch 10 questions from the backend
async function fetchQuestions() {
    // local fetch from local file:
    const response = await fetch("");

    // remote fetch from server (not used because infinityfree refuses to work properly)
    // const response = await fetch("https://viktorhogberg.infinityfreeapp.com/");
    const data = await response.json();

    if (data.message) {
        console.log(data.message);
        fetchQuestions(); // Restart quiz if all questions have been viewed
    } else {
        questions = data; // Store questions in the global questions array
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
    }
}

// Function to display a question
function displayQuestion() {
    // If all questions are not answered yet
    if (currentQuestionIndex < questions.length) {
        // Grab the question
        const question = questions[currentQuestionIndex];
        // Change the html text content
        document.getElementById("question").textContent = question.question;
        // Display current question user is on in the round
        document.getElementById("current-question").textContent = currentQuestionIndex + "/" + questions.length + " answered.";

        // Set answers and reset their appearance
        document.querySelectorAll(".answer").forEach((answer, index) => {
            const answerKey = `answer_${index + 1}`; // Matches answer_1, answer_2, etc.
            answer.querySelector("p").textContent = question[answerKey];
            answer.dataset.correct = (index + 1) === parseInt(question.correct_answer); // Match with correct_answer column
            // Remove the subclasses for correct and incorrect answers as well as picked answer and disabled
            answer.classList.remove("correct");
            answer.classList.remove("incorrect");
            answer.classList.remove("picked-answer");
            answer.classList.remove("disabled");
        });
    } else { // All questions answered
        // Show modal game over dialog with score at the end of the round
        document.getElementById("score").textContent = score + "/" + questions.length;
        document.getElementById("game-over-modal").showModal();
    }
}

// Event listener for answers
document.querySelectorAll(".answer").forEach(answer => {
    answer.addEventListener("click", () => {

        // Grab all answers and add correct or incorrect subclass to them
        document.querySelectorAll(".answer").forEach(a => {
            if (a.dataset.correct === "true") {
                // If answer is correct, add the subclass for it
                a.classList.add("correct")
            }
            else {
                // If answer is incorrect, add the subclass for it
                a.classList.add("incorrect")
            }
            // Add disabled class so further answers cant be clicked once one has been clicked
            a.classList.add("disabled");
        });

        // Add the "picked-answer" class to the clicked answer
        answer.classList.add("picked-answer");

        // Update score if the correct answer is clicked
        if (answer.dataset.correct === "true") {
            score++;
        }
    });
});

// Event listener for next question question (it is possible to skip questions also)
document.getElementById("next-question").addEventListener("click", () => {
    currentQuestionIndex++;
    displayQuestion();
});

// Restart quiz, just fetch new questions
function restartQuiz() {
    fetchQuestions();
}

// Close game-over-modal with button and restart quiz
document.getElementById("close-game-over-modal-button").addEventListener("click", () => {
    document.getElementById("game-over-modal").close();
    restartQuiz();
});

// Initialize quiz at start
fetchQuestions();

// For header menu button dropdown list
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('hamburger-menu-button');
    const menuList = document.getElementById('menu-list');

    // Toggle the menu on click (block is showed, none is hidden)
    menuButton.addEventListener('click', function () {
        if (menuList.style.display === 'block') {
            menuList.style.display = 'none';
        } else {
            menuList.style.display = 'block';
        }
    });

    // Close menu if clicked outside
    document.addEventListener('click', function (event) {
        if (!menuButton.contains(event.target) && !menuList.contains(event.target)) {
            menuList.style.display = 'none';
        }
    });
});

// Function to toggle dark mode
document.getElementById("dark-mode-button").addEventListener("click", () => {
    document.documentElement.classList.toggle('dark-mode');
    const darkModeButton = document.getElementById("hamburger-menu-icon");

    // Check the file name part of the src with endsWith
    if (!darkModeButton.src.endsWith("hamburger-menu-icon-dark-mode.svg")) {
        // Dark mode file
        darkModeButton.src = "assets/icons/hamburger-menu-icon-dark-mode.svg";
    } else {
        // Standard file
        darkModeButton.src = "assets/icons/hamburger-menu-icon.svg";
    }
});

// Function to show "how to play" modal window
document.getElementById("how-to-play-modal-button").addEventListener("click", () => {
    document.getElementById("how-to-play-modal").showModal();
});

// Function to close "how to play" modal window
document.getElementById("close-how-to-play-modal-button").addEventListener("click", () => {
    document.getElementById("how-to-play-modal").close();
});
