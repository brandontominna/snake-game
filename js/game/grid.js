const GRID_SIZE = 20;

// random function needs to be altered to avoid the borders
// because the random food function uses this, it also needs to avoid borders
// and for food to not spawn on fences, grid size must be 20 (avoiding the initial columns/rows)
export function getRandomGridPosition() {
  return {
    x: Math.floor(Math.random() * (GRID_SIZE - 1)) + 2,
    y: Math.floor(Math.random() * (GRID_SIZE - 1)) + 2,
  };
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

const specialCells = {
  "1,1": "topRightCorner",
  "1,2": "topRightCornerRow",
  "2,1": "topRightCornerColumn",

  "1,21": "topLeftCorner",
  "1,20": "topLeftCornerRow",
  "2,21": "topLeftCornerColumn",

  "21,1": "bottomLeftCorner",
  "20,1": "bottomLeftCornerRow",
  "21,2": "bottomLeftCornerColumn",

  "21,21": "bottomRightCorner",
  "21,20": "bottomRightCornerRow",
  "20,21": "bottomRightCornerColumn",

  "11,1": "colCenterRight",
  "11,21": "colCenterLeft",
  "1,11": "rowCenterTop",
  "21,11": "rowCenterBottom",
};

const topBushClasses = ["topBush1", "topBush2", "topBush3", "topBush4"];
const bottomBushClasses = [
  "bottomBush1",
  "bottomBush2",
  "bottomBush3",
  "bottomBush4",
];
const leftBushClasses = ["leftBush1", "leftBush2", "leftBush3", "leftBush4"];
const rightBushClasses = [
  "rightBush1",
  "rightBush2",
  "rightBush3",
  "rightBush4",
];

function createCell(row, col, cellType) {
  const cell = document.createElement("div");
  const specialCellType = specialCells[`${row},${col}`];
  if (specialCellType) {
    cell.classList.add(specialCellType);
  } else {
    cell.classList.add(cellType);
    let bushClass;
    if (cellType === "topCell") {
      bushClass =
        topBushClasses[Math.floor(Math.random() * topBushClasses.length)];
    } else if (cellType === "bottomCell") {
      bushClass =
        bottomBushClasses[Math.floor(Math.random() * bottomBushClasses.length)];
    } else if (cellType === "leftCell") {
      bushClass =
        leftBushClasses[Math.floor(Math.random() * leftBushClasses.length)];
    } else if (cellType === "rightCell") {
      bushClass =
        rightBushClasses[Math.floor(Math.random() * rightBushClasses.length)];
    }
    if (bushClass) {
      cell.classList.add(bushClass);
    }
  }
  cell.style.gridRow = `${row} / span 1`;
  cell.style.gridColumn = `${col} / span 1`;
  return cell;
}



export function drawBorderRows(gameBoard) {
  const numRows = 21;
  const numCols = 21;

  for (let col = 1; col <= numCols; col++) {
    const cell = createCell(numRows, col, "bottomCell");
    gameBoard.appendChild(cell);
  }

  for (let col = 1; col <= numCols; col++) {
    const cell = createCell(1, col, "topCell");
    gameBoard.appendChild(cell);
  }

  for (let row = 2; row < numRows; row++) {
    const cell = createCell(row, numCols, "rightCell");
    gameBoard.appendChild(cell);
  }

  for (let row = 2; row < numRows; row++) {
    const cell = createCell(row, 1, "leftCell");
    gameBoard.appendChild(cell);
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
  for (
    let i = numGrass + numFlowers;
    i < numGrass + numFlowers + numGrass2;
    i++
  ) {
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
