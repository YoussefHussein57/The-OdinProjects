// Step 1: Create the Gameboard module
// This module is responsible for managing the game board, which is an array representing the 9 cells.
const Gameboard = (() => {
  // Initialize the board with empty strings (representing empty cells)
  let board = ["", "", "", "", "", "", "", "", ""];

  // Function to return the current state of the board
  const getBoard = () => board;

  // Function to place a marker (X or O) on the board at a specified index
  // Returns true if the placement is successful, false if the cell is already occupied
  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  // Function to reset the board, clearing all cells
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  // Expose the public methods of the Gameboard module
  return { getBoard, placeMarker, resetBoard };
})();

// Step 2: Create the Player factory
// This function creates a Player object with a name and marker (X or O)
const Player = (name, marker) => {
  return { name, marker };
};

// Step 3: Create the Game module
// This module is responsible for controlling the game flow, switching players, checking for a winner, and rendering the game board
const Game = (() => {
  // Initialize two players with names and markers
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");

  // Set the current player to player 1 at the start
  let currentPlayer = player1;

  // Function to switch the current player
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  // Function to check if there is a winner or a tie
  const checkWinner = () => {
    // Get the current state of the board
    const board = Gameboard.getBoard();

    // Define the winning combinations (rows, columns, diagonals)
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check if any winning combination is met
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // If there's a winner, return the name of the current player
        return currentPlayer.name;
      }
    }

    // If no winner, check if there are still empty cells (game is ongoing)
    // If no empty cells, return "Tie"
    return board.includes("") ? null : "Tie";
  };

  // Function to handle a click on a cell
  // Places the marker, checks for a winner, and switches players if necessary
  const handleClick = (index) => {
    // Place the marker on the board and check if the placement was successful
    if (Gameboard.placeMarker(index, currentPlayer.marker)) {
      // Render the updated board
      render();

      // Check if there's a winner or a tie
      const winner = checkWinner();
      if (winner) {
        // If there's a winner, display an alert and reset the board
        alert(`${winner} wins!`);
        Gameboard.resetBoard();
        render(); // Refresh the board after a win
      } else {
        // If no winner, switch to the other player
        switchPlayer();
      }
    }
  };

  // Function to render the game board in the DOM
  const render = () => {
    // Get the current state of the board
    const board = Gameboard.getBoard();

    // Update the content of each cell in the grid based on the board array
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  // Function to attach event listeners to the cells and the restart button
  const attachEventListeners = () => {
    // Attach click event listeners to each cell in the grid
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", () => handleClick(cell.dataset.index));
    });

    // Attach click event listener to the restart button to reset the board
    document.getElementById("restart").addEventListener("click", () => {
      Gameboard.resetBoard();
      render();
    });
  };

  // Expose the public methods of the Game module
  return { render, attachEventListeners };
})();

// Step 4: Initialize the game after the DOM is fully loaded
// This ensures that event listeners are attached after all elements are available
window.onload = () => {
  Game.render(); // Render the initial empty board
  Game.attachEventListeners(); // Attach event listeners to the cells and restart button
};
