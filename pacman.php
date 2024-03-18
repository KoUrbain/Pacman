<?php

// Initialise la session
session_start();

// Routes pour les endpoints de l'API

if ($_SERVER['REQUEST_METHOD'] === && isset($_POST["start_game"])) {
    function start(){
        
    }
}
else {
    http_response_code(405); // Méthode non autorisée
}

// endpoint pour lancer le jeu

function generateGameArray($n) {
    // Check if n is at least 3
    if ($n < 3) {
        echo "La taille du jeu doit être d'au moins 3.";
        return null; // Return null if n is less than 3
    }

    // Initialisez le tableau avec des pastilles
    $gameArray = array_fill(0, $n, ".");

    // Placez le Pacman, le fantôme et le fruit a des positions arbitraires
    $pacmanIndex = 0;
    $ghostIndex = intval($n / 2);
    $fruitIndex = 1;

    $gameArray[$pacmanIndex] = "C";
    $gameArray[$ghostIndex] = "^.";
    $gameArray[$fruitIndex] = "@";

    return $gameArray;
}

// Retrieve the value of n from the URL parameter
$n = isset($_GET['n']) ? intval($_GET['n']) : 0;

// Generate the game array
$gameArray = generateGameArray($n);

// Return the game array as JSON
echo json_encode($gameArray);
?>
