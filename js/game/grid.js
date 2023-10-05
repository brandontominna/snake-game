const GRID_SIZE = 20;

export function getRandomGridPosition() {
  const x = Math.floor(Math.random() * (GRID_SIZE - 1)) + 2; // Exclude the first and last columns
  const y = Math.floor(Math.random() * (GRID_SIZE - 1)) + 2; // Exclude the first and last rows
  return { x, y };
}


export function outsideGrid(position) {
  if (position.x < 1 || position.x > GRID_SIZE) {
    return true;
  }
  if (position.y < 1 || position.y > GRID_SIZE) {
    return true;
  }
  return false;
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



  
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function createElements(numGrass, numFlowers, numGrass2) {
  const elements = [];
  const positions = [];

  // Generate all possible positions
  for (let x = 2; x <= GRID_SIZE; x++) {
    for (let y = 2; y <= GRID_SIZE; y++) {
      positions.push({ x, y });
    }
  }

  // Randomize the order of the positions
  shuffleArray(positions);

  // Add elements at the first n positions
  for (let i = 0; i < numGrass; i++) {
    elements.push({ ...positions[i], type: "grass" });
  }
  for (let i = numGrass; i < numGrass + numFlowers; i++) {
    elements.push({ ...positions[i], type: "flower" });
  }
  for (let i = numGrass + numFlowers; i < numGrass + numFlowers + numGrass2; i++) {
    elements.push({ ...positions[i], type: "grass2" });
  }

  return elements;
}

export function drawRocksAndFlowers(gameBoard, elements) {
  elements.forEach((element) => {
    const { x, y, type } = element;
    const cell = document.createElement("div");

    if (type === "grass") {
      cell.classList.add("grassCell");
    } else if (type === "flower") {
      cell.classList.add("flowerCell");
    } else if (type === "grass2") {
      cell.classList.add("grass2Cell");
    }

    // Set the grid position for the element
    cell.style.gridRow = `${y} / span 1`;
    cell.style.gridColumn = `${x} / span 1`;

    // Append the element to the game board
    gameBoard.appendChild(cell);
  });
}



