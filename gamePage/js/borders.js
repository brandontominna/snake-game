const numRows = 21;
const numCols = 21;

// Special cells, which are the corners and the adjacent cells
const specialCells = {
  "1,1": "topLeftCorner",
  "1,2": "topLeftAdjacentRow",
  "2,1": "topLeftAdjacentColumn",
  "1,21": "topRightCorner",
  "1,20": "topRightAdjacentRow",
  "2,21": "topRightAdjacentColumn",
  "21,1": "bottomLeftCorner",
  "20,1": "bottomLeftAdjacentRow",
  "21,2": "bottomLeftAdjacentColumn",
  "21,21": "bottomRightCorner",
  "21,20": "bottomRightAdjacentRow",
  "20,21": "bottomRightAdjacentColumn",
  "11,1": "middleLeft",
  "11,21": "middleRight",
  "1,11": "middleTop",
  "21,11": "middleBottom",
};

// Function to generate bush classes
function generateBushClasses(baseName, count) {
  const classes = [];
  for (let i = 1; i <= count; i++) {
    classes.push(`${baseName}${i}`);
  }
  return classes;
}

// Bush classes
const bushClasses = {
  topCell: { classes: generateBushClasses("topBush", 4), counter: 0 },
  bottomCell: { classes: generateBushClasses("bottomBush", 4), counter: 0 },
  leftCell: { classes: generateBushClasses("leftBush", 4), counter: 0 },
  rightCell: { classes: generateBushClasses("rightBush", 4), counter: 0 },
};

// Function to create a cell
function createCell(row, col, cellType) {
  const cell = document.createElement("div");
  const specialCellType = specialCells[`${row},${col}`];

  if (specialCellType) {
    cell.classList.add(specialCellType);
  } else {
    cell.classList.add(cellType);
    if (bushClasses[cellType]) {
      const bushClass = bushClasses[cellType].classes[bushClasses[cellType].counter];
      bushClasses[cellType].counter = (bushClasses[cellType].counter + 1) % 4;
      if (bushClass) cell.classList.add(bushClass);
    }
  }

  cell.style.gridRow = `${row} / span 1`;
  cell.style.gridColumn = `${col} / span 1`;

  return cell;
}

// Function to draw borders
export function drawBorders(gameBoard) {
  for (let row = 1; row <= numRows; row++) {
    for (let col = 1; col <= numCols; col++) {
      let cellType;
      if (row === 1) cellType = "topCell";
      else if (row === numRows) cellType = "bottomCell";
      else if (col === 1) cellType = "leftCell";
      else if (col === numCols) cellType = "rightCell";

      if (cellType) {
        const cell = createCell(row, col, cellType);
        gameBoard.appendChild(cell);
      }
    }
  }
}