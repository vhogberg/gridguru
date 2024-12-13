// scripts/script.js

// Function to fetch quiz questions from the PHP backend
async function fetchQuestions() {
    const response = await fetch("./utils/fetch-question.php"); // note on file structure here, .. or .
    const data = await response.json();

    if (data.error) {
        console.error("Error fetching questions:", data.error);
    } else {
        displayQuestions(data);
    }
}

// Function to display the actual questions in html
function displayQuestions(questions) {
    const questionElement = document.getElementById("question");
    const answers = document.querySelectorAll(".answer");

    if (questions.length > 0) {
        // Randomly select a question from the list
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];

        // Set the question text
        questionElement.textContent = randomQuestion.question;

        // Set the answer choices
        answers.forEach((answer, index) => {
            const answerKey = `answer_${index + 1}`; // 'answer_1', 'answer_2', etc.
            if (randomQuestion[answerKey]) {
                answer.querySelector("p").textContent = randomQuestion[answerKey]; // Set answer text
            } else {
                answer.querySelector("p").textContent = "No answer available"; // Fallback text
            }
        });
    } else {
        console.error("No questions available");
    }
}

document.getElementById('next-question').addEventListener('click', () => {
    fetchQuestions(); // Fetch new question on button click
});

// Call the function to load questions
fetchQuestions();