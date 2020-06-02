<?php

try {
    // Connect to the database
    $dsn = "mysql:host=db; dbname=dictionary";
    $db_conn = new PDO($dsn, "cmpt304", "mmljar");
    $db_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error connecting to database: " .  $e->getMessage();
    die();
}

echo "\nConnected successfully";



// Retrieve word from request
if (isset($_GET['word'])) {
    $word = $_GET['word'];
}


// Query the database for the correct words column 
$correct_query = $db_conn->query("SELECT correct FROM words WHERE correct='$word'");

$res->correct = false;
$res->mutated = false;

while ($record = $correct_query->fetch()) {
    if ("$record[correct]") {
        $res->correct = true;
    }
}

// Query the database for the mutation words column
$mutation_query = $db_conn->query("SELECT mutation FROM words WHERE mutation='$word'");

while ($record = $mutation_query->fetch()) {
    if ("$record[mutation]") {
        $res->mutated = true;
    }
}

// Send results back
$resJSON = json_encode($res);
echo $resJSON;
