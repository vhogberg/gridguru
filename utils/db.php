<?php
// utils/db.php

/* DB INFO
Table: f1_quiz
Columns:
id: int
answer_1: varchar
answer_2: varchar
answer_3: varchar
answer_4: varchar
corrent_answer: int (1-4)

*/

// Connect to MySQL database
function getDbConnection() {
    $servername = "localhost"; //  database server
    $username = "root";        //  database username
    $password = "";            //  database password
    $dbname = "f1_quiz";       //  database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}
?>
