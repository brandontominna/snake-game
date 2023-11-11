// Direction constants
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

// Game state
let gameStarted = false;

// Event listener for keydown events (arrowkeys)
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (lastInputDirection.y === 0) {
      inputDirection = { x: 0, y: -1 };
      gameStarted = true;
    }
  } else if (e.key === "ArrowDown") {
    if (lastInputDirection.y === 0) {
      inputDirection = { x: 0, y: 1 };
      gameStarted = true;
    }
  } else if (e.key === "ArrowLeft") {
    if (lastInputDirection.x === 0 && gameStarted) {
      inputDirection = { x: -1, y: 0 };
      gameStarted = true;
    }
  } else if (e.key === "ArrowRight") {
    if (lastInputDirection.x === 0) {
      inputDirection = { x: 1, y: 0 };
      gameStarted = true;
    }
  }
});

// Function to get the input direction
export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}
