<?php

// Initialise la session
session_start();

// Routes pour les endpoints de l'API

if ($_SERVER['REQUEST_METHOD'] === && isset($_POST["start_game"])) {
    function start(){
        
    }
}

?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["start_game"])) {
    // Your game start logic here
    echo "Game started!";
}
?>
