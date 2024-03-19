<?php
session_start();

// Fonction pour démarrer un nouveau jeu
function startNewGame($n) {
    $_SESSION['pacmanGame'] = generateGame($n);
    $_SESSION['pacman_position'] = ; // Position initiale du Pac-Man
    $_SESSION['ghost_pos'] = intval($n / 2);
    $_SESSION['fruit_pos'] = 1;
    $_SESSION['score'] = 0; // Score initial
    $_SESSION['game_started'] = true;
}

function generateGame($n) {
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

// Fonction pour déplacer le Pac-Man
function movePacman($direction) {
    if ($_SESSION['game_started']) {

        if ($direction === "right") {
            $_SESSION['pacman_position'] += 1;
        } elseif ($direction === "left") {
            $_SESSION['pacman_position'] -= 1;
            function moveLeft() {
                global $pacmanGame, $pacmanIndex, $n;
            
                $pacmanGame[$pacmanIndex] = "_";
            
                if ($pacmanIndex - 1 < 0) {
                    $pacmanIndex = $n - 1;
                    if ($pacmanGame[$pacmanIndex] === ".") {
                        eat(1);
                    } elseif ($pacmanGame[$pacmanIndex] === "@") {
                        eat(5);
                    } elseif ($pacmanGame[$pacmanIndex] === "^" || $pacmanGame[$pacmanIndex] === "^.") {
                        gameOver();
                    } else {
                        $pacmanGame[$pacmanIndex] = "C";
                    }            
                    return;
                }
            
                $pacmanIndex--;
            
                if ($pacmanGame[$pacmanIndex] === ".") {
                    eat(1);
                } elseif ($pacmanGame[$pacmanIndex] === "@") {
                    eat(5);
                } elseif ($pacmanGame[$pacmanIndex] === "^" || $pacmanGame[$pacmanIndex] === "^.") {
                    gameOver();
                } else {
                    $pacmanGame[$pacmanIndex] = "C";
                }
            
                // Appel à la fonction display() - à définir
                // display();
            }
            
        }

        // Met a jours le score
        $_SESSION['score'] += 10;
    }
}

// Fonction pour enregistrer le score du joueur
function saveScore($playerName) {
    if (isset($_SESSION['score'])) {
        $scores = isset($_SESSION['scores']) ? $_SESSION['scores'] : array();
        $scores[$playerName] = $_SESSION['score'];
        arsort($scores); // Triez les scores en ordre décroissant
        $_SESSION['scores'] = $scores;
    }
}

// Routeur pour gérer les demandes d'API
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'start_game':
                startNewGame();
                break;
            case 'move_pacman':
                if (isset($_POST['direction'])) {
                    movePacman($_POST['direction']);
                }
                break;
            case 'save_score':
                if (isset($_POST['player_name'])) {
                    saveScore($_POST['player_name']);
                }
                break;
            default:
                // Action non prise en charge
                break;
        }
    }
}

// Routeur pour les demandes GET d'état de jeu
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'get_state') {
        echo json_encode(array(
            'pacman_position' => $_SESSION['pacman_position'],
            'score' => $_SESSION['score'],
            'game_started' => $_SESSION['game_started'],
            'scores' => isset($_SESSION['scores']) ? $_SESSION['scores'] : array()
        ));
    }
}
?>

