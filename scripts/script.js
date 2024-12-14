// scripts/script.js

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Function to fetch 10 questions from the backend
async function fetchQuestions() {
    const response = await fetch("./utils/fetch-question.php");
    const data = await response.json();

    if (data.message) {
        console.log(data.message);
        fetchQuestions(); // Restart quiz if all questions have been viewed
    } else {
        questions = data; // Store questions in the global variable
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
    }
}

// Function to display a question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById("question").textContent = question.question;

        // Set answers and reset their appearance
        document.querySelectorAll(".answer").forEach((answer, index) => {
            const answerKey = `answer_${index + 1}`; // Matches answer_1, answer_2, etc.
            answer.querySelector("p").textContent = question[answerKey];
            answer.dataset.correct = (index + 1) === parseInt(question.correct_answer); // Match with correct_answer column
            answer.style.backgroundColor = ""; // Reset colors
            answer.classList.remove("disabled");
        });
    } else {
        // Show modal at the end of the round
        document.getElementById("score").textContent = score + "/" + questions.length;
        document.getElementById("modal-window").showModal();
    }
}

// Event listener for answers
document.querySelectorAll(".answer").forEach(answer => {
    answer.addEventListener("click", () => {
        // Disable further clicks
        document.querySelectorAll(".answer").forEach(a => a.classList.add("disabled"));

        // Highlight correct and incorrect answers
        document.querySelectorAll(".answer").forEach(a => {
            a.style.backgroundColor = a.dataset.correct === "true" ? "green" : "red";
        });

        // Update score if the correct answer is clicked
        if (answer.dataset.correct === "true") {
            score++;
        }
    });
});

// Event listener for next question
document.getElementById("next-question").addEventListener("click", () => {
    currentQuestionIndex++;
    displayQuestion();
});

// Restart quiz logic
function restartQuiz() {
    fetchQuestions();
}

// Close modal and restart quiz
document.getElementById("close-modal-button").addEventListener("click", () => {
    document.getElementById("modal-window").close();
    restartQuiz();
});

// Initialize quiz
fetchQuestions();
