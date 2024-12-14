// scripts/script.js

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Function to fetch 10 questions from the backend
async function fetchQuestions() {
    const response = await fetch("./utils/fetch-question.php");
    const data = await response.json();
    
    if (data.error) {
        console.error("Error fetching questions:", data.error);
    } else {
        questions = data; // Store questions in the global variable
        displayQuestion();
    }
    console.log("FRÅGORARRAY: " + questions);
}

// Function to display a question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById("question").textContent = question.question;

        // Set answers and mark the correct one
        document.querySelectorAll(".answer").forEach((answer, index) => {
            const answerKey = `answer_${index + 1}`; // Matches answer_1, answer_2, etc.
            answer.querySelector("p").textContent = question[answerKey];
            answer.dataset.correct = (index + 1) === parseInt(question.correct_answer); // Compare with correct_answer column
            answer.style.backgroundColor = ""; // Reset colors
        });

        console.log("FRÅGAINDEX: " + currentQuestionIndex);
        console.log("Längd: " + questions.length);
        console.log("Poäng: " + score);
        
    } else {
        console.log("KLART!!");

        showModalWindow();
    }
}

// Event listener for answers
document.querySelectorAll(".answer").forEach(answer => {
    answer.addEventListener("click", () => {
        // Highlight correct and incorrect answers
        document.querySelectorAll(".answer").forEach(answer => {
            answer.style.backgroundColor = answer.dataset.correct === "true" ? "green" : "red";
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

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    fetchQuestions();
}

const modalWindow = document.getElementById("modal-window");

// Show the modal with dialogs' method showModal()
function showModalWindow() {
    document.getElementById("score").textContent = score + "/" + questions.length;
    modalWindow.showModal();
}

// Close modal with close()
function closeModalWindow() {
    modalWindow.close();
    restartQuiz();
}

// Listeners for the buttons
document.getElementById("close-modal-button").addEventListener("click", closeModalWindow);

// Initialize quiz
fetchQuestions();
