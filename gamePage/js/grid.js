const GRID_SIZE = 20;

// Function to generate a random position on the grid
export function getRandomGridPosition() {
  return {
    x: Math.floor(Math.random() * (GRID_SIZE - 1)) + 2,
    y: Math.floor(Math.random() * (GRID_SIZE - 1)) + 2,
  };
}

// Function to check if a position is outside the grid
export function outsideGrid(position) {
  return position.x < 2 || position.x > GRID_SIZE || position.y < 2 || position.y > GRID_SIZE;
}

// Function to draw the grid on the game board
export function drawGrid(gameBoard) {
  for (let row = 1; row <= GRID_SIZE + 1; row++) {
    for (let col = 1; col <= GRID_SIZE + 1; col++) {
      const cell = createCell(row, col);
      gameBoard.appendChild(cell);
    }
  }
  console.log('Grid drawn');
}

// Helper function to create a cell
function createCell(row, col) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.gridRow = `${row} / span 1`;
  cell.style.gridColumn = `${col} / span 1`;
  return cell;
}




