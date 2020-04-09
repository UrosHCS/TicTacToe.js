var COLOR_VICTORY = "#D500F9";

var gameMatrix; //3x3 matrix of number representations (0, 1, -1)
var divMatrix = setupDivMatrix(); //3x3 matrix of labels (fields)
var gameOver; //boolean

var playerScoreElement = document.getElementById("wins");
var computerScoreElement = document.getElementById("losses");

var playerScore = 0;
var computerScore = 0;

function incrementPlayerScore() {
  playerScore++;
  playerScoreElement.innerHTML = playerScore;
}
function incrementComputerScore() {
  computerScore++;
  computerScoreElement.innerHTML = computerScore;
}

function setupDivMatrix() {
  //   var table = document.getElementById("table");
  var matrix = [[], [], []];
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      // matrix[row][col] = table.getElementsByClassName("row")[row].getElementsByClassName("table-cell")[col];
      matrix[row][col] = document.getElementById(row + "-" + col);
    }
  }
  return matrix;
}

function _newGame() {
  gameMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]; //filled with zeros as needed
  gameOver = false;
}

function computerMove() {
  //Prodji svih 7 (x) mogucih "trojki" koje dovode do pobede (ima ih 7)
  for (var x = 0; x <= 7; x++) {
    // Potrazi prvo da li negde imaju 2 oksa i trece prazno mesto i popuni ga sa oks
    if (arraySum(gameMatrix, x) === -2) {
      var zero1 = indexOfZero(gameMatrix, x);
      gameMatrix[zero1[0]][zero1[1]] = -1;
      return divMatrix[zero1[0]][zero1[1]];
    }
  }
  // Zatim potrazi da li negde imaju 2 iksa i trece prazno mesto i popuni ga sa oks
  for (x = 0; x <= 7; x++) {
    if (arraySum(gameMatrix, x) === 2) {
      var zero2 = indexOfZero(gameMatrix, x);
      gameMatrix[zero2[0]][zero2[1]] = -1;
      return divMatrix[zero2[0]][zero2[1]];
    }
  }
  //Ako ne, onda napravi random potez
  return computerRandomMove();
}

function computerRandomMove() {
  var randomRow = Math.floor(Math.random() * 3);
  var randomColumn = Math.floor(Math.random() * 3);

  if (gameMatrix[randomRow][randomColumn] === 0) {
    gameMatrix[randomRow][randomColumn] = -1;
    return divMatrix[randomRow][randomColumn];
  } else return computerRandomMove();
}

function isTheBoardFull() {
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 3; column++) {
      if (gameMatrix[row][column] === 0) {
        return false;
      }
    }
  }
  gameOver = true;
  return true;
}

function didSome1Win(three) {
  // Prodji svih 7 (x) mogucih "trojki" koje dovode do pobede (ima ih 7)
  for (var x = 0; x <= 7; x++) {
    if (arraySum(gameMatrix, x) === three) {
      if (x >= 0 && x <= 2) {
        for (var i = 0; i < 3; i++) {
          divMatrix[x][i].style.backgroundColor = COLOR_VICTORY;
        }
      } else if (x >= 3 && x <= 5) {
        for (var i = 0; i < 3; i++) {
          divMatrix[i][x - 3].style.backgroundColor = COLOR_VICTORY;
        }
      } else if (x === 6) {
        for (var i = 0; i < 3; i++) {
          divMatrix[i][i].style.backgroundColor = COLOR_VICTORY;
        }
      } else if (x === 7) {
        for (var i = 0; i < 3; i++) {
          divMatrix[2 - i][i].style.backgroundColor = COLOR_VICTORY;
        }
      }
      removeAllClicks();
      gameOver = true;
      if (three === 3) {
        incrementPlayerScore();
      } else if (three === -3) {
        incrementComputerScore();
      }
      break;
    }
  }

  return gameOver;
}

function _computerMove() {
  var move = false;
  if (gameOver === false) {
    if (!didSome1Win(3) && !isTheBoardFull()) {
      move = computerMove();
      didSome1Win(-3);
    }
  }
  return move;
}
