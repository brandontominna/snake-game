const GRID_SIZE = 20;

// random function needs to be altered to avoid the borders
// because the random food function uses this, it also needs to avoid borders
// and for food to not spawn on fences, grid size must be 20 (avoiding the initial columns/rows)
export function getRandomGridPosition() {
  return {
    x: Math.floor(Math.random() * (GRID_SIZE - 1)) + 2,
    y: Math.floor(Math.random() * (GRID_SIZE - 1)) + 2
  }
}

// function to detect if coordinates are outside the grid, 
// with static and dynamic elements added and their double grids, this needs to be 2 not 1
export function outsideGrid(position) {
  if (position.x < 2 || position.x > GRID_SIZE) {
    return true;
  }
  if (position.y < 2 || position.y > GRID_SIZE) {
    return true;
  }
  return false;
}

// function rendered only once when app starts, 
// loops through first column and row/ borders, creates an element and adds the class 
export function drawBorderRows(gameBoard) {
  const numRows = 21;
  const numCols = 21;

  for (let col = 1; col <= numCols; col++) {
    const cell = document.createElement("div");
    cell.classList.add("bottomCell");
    cell.style.gridRow = `${numRows} / span 1`; 
    cell.style.gridColumn = `${col} / span 1`; 
    gameBoard.appendChild(cell);
  }

  for (let col = 1; col <= numCols; col++) {
    const topCell = document.createElement("div");
    topCell.classList.add("topCell");
    topCell.style.gridRow = "1 / span 1";
    topCell.style.gridColumn = `${col} / span 1`;
    gameBoard.appendChild(topCell);
  }

  for (let row = 2; row < numRows; row++) {
    const rightCell = document.createElement("div");
    rightCell.classList.add("rightCell");
    rightCell.style.gridRow = `${row} / span 1`;
    rightCell.style.gridColumn = `${numCols} / span 1`;
    gameBoard.appendChild(rightCell);
  }

  for (let row = 2; row < numRows; row++) {
    const leftCell = document.createElement("div");
    leftCell.classList.add("leftCell");
    leftCell.style.gridRow = `${row} / span 1`;
    leftCell.style.gridColumn = "1 / span 1";
    gameBoard.appendChild(leftCell);
  }
}



// swapping function to randomly generate positions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// function to create the actual elements, 2 arrays initialized, 
// first all positions are pushed onto the positions array, then given a random order
// loops run for the input amount of element, where the positions and types are assigned 
export function createElements(numGrass, numFlowers, numGrass2) {
  const elements = [];
  const positions = [];

  for (let x = 2; x <= GRID_SIZE; x++) {
    for (let y = 2; y <= GRID_SIZE; y++) {
      positions.push({ x, y });
    }
  }

  shuffleArray(positions);

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

// function that draws the elements, loops through elements array, 
// for each element checks position and type, 
// depending on type a unique class is added, and positions are applied on the grid. 
export function drawGrassAndFlowers(gameBoard, elements) {
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

    cell.style.gridRow = `${y} / span 1`;
    cell.style.gridColumn = `${x} / span 1`;

    gameBoard.appendChild(cell);
  });
}


// currently grass and flowers and dynamically and randomly rendered, 
// subject to change to imporve performance or not if more background types can be added

