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
        document.getElementById("current-question").textContent = currentQuestionIndex + "/" + questions.length + " answered.";

        // Set answers and reset their appearance
        document.querySelectorAll(".answer").forEach((answer, index) => {
            const answerKey = `answer_${index + 1}`; // Matches answer_1, answer_2, etc.
            answer.querySelector("p").textContent = question[answerKey];
            answer.dataset.correct = (index + 1) === parseInt(question.correct_answer); // Match with correct_answer column
            // Remove the subclasses for correct and incorrect answers as well as picked answer
            answer.classList.remove("correct");
            answer.classList.remove("incorrect");
            answer.classList.remove("picked-answer");
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

        // Grab all answers and add correct or incorrect subclass to them
        document.querySelectorAll(".answer").forEach(a => {
            if (a.dataset.correct === "true"){
                // If answer is correct, add the subclass for it
                a.classList.add("correct")
            }
            else {
                // If answer is incorrect, add the subclass for it
                a.classList.add("incorrect")
            }
        });

        // Add the "picked-answer" class to the clicked answer
        answer.classList.add("picked-answer");

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
