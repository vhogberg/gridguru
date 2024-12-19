<?php

// utils/db.php

/* DB INFO BELOW
Database name: f1_quiz

Table: questions

Columns:
id: int
answer_1: varchar(255)
answer_2: varchar(255)
answer_3: varchar(255)
answer_4: varchar(255)
corrent_answer: int

SQL QUERY USED TO CREATE TABLE:

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT,
    answer_1 VARCHAR(255),
    answer_2 VARCHAR(255),
    answer_3 VARCHAR(255),
    answer_4 VARCHAR(255),
    correct_answer INT
);

EXAMPLE SQL QUERY USED TO INSERT QUESTIONS:

INSERT INTO questions (question, answer_1, answer_2, answer_3, answer_4, correct_answer)
VALUES
("What is the maximum allowed fuel load of a 2024 F1 car during a race?", "100 kg", "95 kg", "105 kg", "110 kg", 4),
("What is the standard tire supplier for F1?", "Michelin", "Bridgestone", "Pirelli", "Goodyear", 3),
("Which driver has won the most races in a single season?", "Sebastian Vettel", "Lewis Hamilton", "Michael Schumacher", "Max Verstappen", 4),
("How many teams competed in the 2023 F1 season?", "8 teams", "9 teams", "10 teams", "12 teams", 3),
("Which driver has the most pole positions in F1 history?", "Sebastian Vettel", "Max Verstappen", "Lewis Hamilton", "Michael Schumacher", 3),
("Which track is known as the 'Temple of Speed'?", "Red Bull Ring", "Monaco Circuit", "Autodromo Nazionale Monza", "Silverstone", 3);

*/

// Connect to MySQL database
function getDbConnection() {
    $servername = "localhost"; //  database server (local used)
    $username = "root";        //  database username (xampp default)
    $password = "";            //  database password (xampp default)
    $dbname = "f1_quiz";       //  database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // Return the connection (used in fetch-question.php)
    return $conn;
}
?>
