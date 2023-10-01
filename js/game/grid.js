
const GRID_SIZE = 20

export function getRandomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}


export function outsideGrid(position) {
    if(position.x < 1 || position.x > GRID_SIZE) {
        return true
    }
    if(position.y < 1 || position.y > GRID_SIZE) {
        return true
    }
    return false
}


export function drawBorderRows(gameBoard) {
    // Get the total number of rows and columns in the grid
    const numRows = 21;
    const numCols = 21;
  
    for (let col = 1; col <= numCols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("bottomCell");
      cell.style.gridRow = `${numRows} / span 1`; // Specify the row position
      cell.style.gridColumn = `${col} / span 1`; // Specify the column position
      gameBoard.appendChild(cell);
    }
  
    // Loop through the cells in the top row and change their background color to yellow
    for (let col = 1; col <= numCols; col++) {
      const topCell = document.createElement("div");
      topCell.classList.add("topCell");
      topCell.style.gridRow = "1 / span 1";
      topCell.style.gridColumn = `${col} / span 1`;
      gameBoard.appendChild(topCell);
    }
  
    // Loop through the cells in the right column and change their background color to yellow
    for (let row = 2; row < numRows; row++) {
      const rightCell = document.createElement("div");
      rightCell.classList.add("rightCell");
      rightCell.style.backgroundColor = "yellow";
      rightCell.style.gridRow = `${row} / span 1`;
      rightCell.style.gridColumn = `${numCols} / span 1`;
      gameBoard.appendChild(rightCell);
    }
  
    // Loop through the cells in the left column and change their background color to yellow
    for (let row = 2; row < numRows; row++) {
      const leftCell = document.createElement("div");
      leftCell.classList.add("leftCell");
      leftCell.style.gridRow = `${row} / span 1`;
      leftCell.style.gridColumn = "1 / span 1";
      gameBoard.appendChild(leftCell);
    }
  }
  
  