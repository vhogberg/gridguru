<?php

// utils/fetch-question.php

// Handling CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");

// Use JSON content type
header("Content-Type: application/json");

// Include db connection
include 'db.php';

// Fetch questions from db
function getQuestions()
{
    // Get the connection to the db
    $conn = getDbConnection();

    // Using session to prevent user from getting the same questions over and over
    session_start();

    // Array viewed_questions contains the questions the user has already seen
    if (!isset($_SESSION['viewed_questions'])) {
        $_SESSION['viewed_questions'] = [];
    }
    $viewed_ids = !empty($_SESSION['viewed_questions'])
        ? implode(',', $_SESSION['viewed_questions'])
        : '0';

    // SQL query to the db that selects 10 questions that have not already been viewed, ordered randomly.
    $sql = "SELECT * FROM questions
            WHERE id NOT IN ($viewed_ids)
            ORDER BY RAND()
            LIMIT 10";

    // Handle SQL query result and encode to json
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $questions = [];
        while ($row = $result->fetch_assoc()) {
            $_SESSION['viewed_questions'][] = $row['id'];
            $questions[] = $row;
        }
        echo json_encode($questions);
    } else {
        $_SESSION['viewed_questions'] = []; // Reset session when all questions are viewed, so user can start again
        echo json_encode(["message" => "All questions have been viewed. Restarting."]);
    }
    // Close db donnection
    $conn->close();
}

// Execute the method
getQuestions();