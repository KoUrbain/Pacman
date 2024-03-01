let pacmanIndex;
let ghostIndex;
let fruitIndex;
let n;
let score = 0;
let numOfPas;
let pacmanGame;

document.getElementById("start").addEventListener("click", start);

function start() {
  let input = window.prompt("Entrer la taille du jeu (au moins 3):");
  n = parseInt(input);
  pacmanGame = createGame(n);

  function display() {
    let Displayboard = document.getElementById("board");
    let board = pacmanGame.join("--");
    Displayboard.innerHTML = board;
  }

  // Crée la table de score
  var tab = document.getElementById("val");
  tab.innerHTML = score;
  


  function createGame(n) {
    // Vérifiez que n est au moins égal à 3
    console.log("Okay it works");
    if (n < 3) {
      console.log("La taille du jeu doit être d'au moins 3.");
      return;
    }

    // Nombre de pastisse dans le jeu
    numOfPas = n - 1;

    // Initialisez le tableau avec des pastilles
    let gameArray = Array(n).fill(".");

    // Placez le Pacman, le fantôme et le fruit a des positions arbitraires
    pacmanIndex = 0;
    ghostIndex = parseInt(n / 2);
    fruitIndex = 1;

    gameArray[pacmanIndex] = "C";
    gameArray[ghostIndex] = "^.";
    gameArray[fruitIndex] = "@";

    return gameArray;
  }

  display();

  const moveInterv = setInterval(ghostMove, 600);

  function gameOver() {
    console.log(pacmanGame);
    let inp = window.prompt("GAME OVER... TRY AGAIN? Y/N:");
    n = inp;
    if (n === "Y") {
        start();
    } else {
      inp = window.alert("BYEEEE");
    }
    clearInterval(moveInterv);
  }

  function moveLeft() {
    pacmanGame[pacmanIndex] = "_";
    if (pacmanIndex - 1 < 0) {
      pacmanIndex = n - 1;
      if (pacmanGame[pacmanIndex] === ".") {
        eat(1);
      } else if (pacmanGame[pacmanIndex] === "@") {
        eat(5);
      } else if (
        pacmanGame[pacmanIndex] === "^" ||
        pacmanGame[pacmanIndex] === "^."
      ) {
        gameOver();
      } else {
        pacmanGame[pacmanIndex] = "C";
      }
      //ghostMove();
      display();
      return;
    }
    pacmanIndex--;
    if (pacmanGame[pacmanIndex] === ".") {
      eat(1);
    } else if (pacmanGame[pacmanIndex] === "@") {
      eat(5);
    } else if (
      pacmanGame[pacmanIndex] === "^" ||
      pacmanGame[pacmanIndex] === "^."
    ) {
      gameOver();
    } else {
      pacmanGame[pacmanIndex] = "C";
    }
    //ghostMove();
    display();
  }

  function moveRight() {
    pacmanGame[pacmanIndex] = "_";
    if (pacmanIndex + 1 === n) {
      pacmanIndex = 0;
      if (pacmanGame[pacmanIndex] === ".") {
        eat(1);
      } else if (pacmanGame[pacmanIndex] === "@") {
        eat(5);
      } else if (
        pacmanGame[pacmanIndex] === "^" ||
        pacmanGame[pacmanIndex] === "^."
      ) {
        gameOver();
      } else {
        pacmanGame[pacmanIndex] = "C";
      }
      //ghostMove();
      display();
      return;
    }
    pacmanIndex++;
    if (pacmanGame[pacmanIndex] === ".") {
      eat(1);
    } else if (pacmanGame[pacmanIndex] === "@") {
      eat(5);
    } else if (
      pacmanGame[pacmanIndex] === "^" ||
      pacmanGame[pacmanIndex] === "^."
    ) {
      gameOver();
    } else {
      pacmanGame[pacmanIndex] = "C";
    }
    //ghostMove();
    display();
  }

  function handleArrowKeys(event) {
    if (event.key === "ArrowLeft") {
      console.log("Left arrow key pressed");
      moveLeft();
    } else if (event.key === "ArrowRight") {
      console.log("Right arrow key pressed");
      moveRight();
    }
    display();
  }
  document.addEventListener("keydown", handleArrowKeys);

  function eat(x) {
    pacmanGame[pacmanIndex] = "O";
    display();
    pacmanGame[pacmanIndex] = "C";
    if (x === 1) {
      score++;
    } else {
      score = score + 5;
    }
    numOfPas--;
    if(numOfPas === 0){
        window.alert("CONGRATULATIONS YOY'VE WON!!! \nScore:", score);
      }
    tab.innerHTML = score;
    display();
  }

  function ghostMove() {
    if (ghostIndex === pacmanIndex) {
      gameOver();
    } else {
      console.log(pacmanGame);
      console.log("Gind = ", ghostIndex, " Pind = ", pacmanIndex);
      // pacmanGame[ghostIndex] = ".";
      if (ghostIndex < pacmanIndex) {
        pacmanGame[ghostIndex + 1] = priority(ghostIndex, ghostIndex + 1);
        ghostIndex++;
      } else {
        pacmanGame[ghostIndex - 1] = priority(ghostIndex, ghostIndex - 1);
        ghostIndex--;
      }

      display();
    }

    //figures out the next position value of the ghost and updates its previous one
    function priority(current, nextIndex) {
      if (pacmanGame[nextIndex] === ".") {
        if (pacmanGame[current] === "^.") {
          pacmanGame[current] = ".";
        } else if (pacmanGame[current] === "^@") {
          console.log("right????");
          pacmanGame[current] = "@";
        } else {
          console.log("the fuck????");
          pacmanGame[current] = "_";
        }

        return "^.";
      } else if (pacmanGame[nextIndex] === "_") {
        if (pacmanGame[current] === "^.") {
          pacmanGame[current] = ".";
        } else if (pacmanGame[current] === "^@") {
          pacmanGame[current] = "@";
        } else {
          pacmanGame[current] = "_";
        }
        return "^";
      } else if (pacmanGame[nextIndex] === "@") {
        if (pacmanGame[current] === "^.") {
          pacmanGame[current] = ".";
        } else {
          pacmanGame[current] = "_";
        }
        return "^@";
      }
    }
  }
}
