<?php
// utils/fetch-question.php


// Include the database connection
include 'db.php';

function getQuestions() {
    $conn = getDbConnection();
    
    $sql = "SELECT * FROM questions LIMIT 10"; // Query to fetch quiz questions
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $questions = array();
        
        // Fetch and store questions
        while($row = $result->fetch_assoc()) {
            $questions[] = $row;
        }
        
        echo json_encode($questions); // Return as JSON
    } else {
        echo json_encode(array("error" => "No questions found"));
    }
    
    $conn->close();
}

// Call the function to output questions
getQuestions();
?>
