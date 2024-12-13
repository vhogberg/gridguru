<?php
// utils/db.php

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
