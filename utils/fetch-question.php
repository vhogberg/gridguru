<?php
// utils/fetch-question.php

// Include the database connection
include 'db.php';

function getQuestions()
{
    $conn = getDbConnection();

    // using session to track viewed questions
    session_start();

    // Initialize viewed questions array in session if not already exists
    if (!isset($_SESSION['viewed_questions'])) {
        $_SESSION['viewed_questions'] = array();
    }

    // Convert viewed questions to a comma-separated string for SQL query
    $viewed_ids = !empty($_SESSION['viewed_questions'])
        ? implode(',', $_SESSION['viewed_questions'])
        : '0';

    // Query to get questions not in viewed questions
    $sql = "SELECT * FROM questions
            WHERE id NOT IN ($viewed_ids)
            ORDER BY RAND()
            LIMIT 10";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $questions = array();

        while ($row = $result->fetch_assoc()) {
            // Add this question to viewed questions
            $_SESSION['viewed_questions'][] = $row['id'];
            $questions[] = $row;
        }

        echo json_encode($questions);
    } else {
        // If all questions have been viewed, reset the session
        $_SESSION['viewed_questions'] = array();
        echo json_encode(array("message" => "All questions have been viewed. Restarting."));
    }

    $conn->close();
}

// Call the function to output questions
getQuestions();
