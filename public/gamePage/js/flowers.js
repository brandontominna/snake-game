const GRID_SIZE = 20;

// Flower data map with class types and quantities
export const flowerData = [
  { type: "leaf1", quantity: 10 },
  { type: "leaf2", quantity: 10 },
  { type: "leaf3", quantity: 10 },
  { type: "leaf4", quantity: 10 },
  { type: "banana1", quantity: 10 },
  { type: "banana2", quantity: 10 },
];

// Function to randomly generate positions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to create the elements and their positions
export function createElements(flowers) {
  const elements = [];
  const positions = [];

  // Generate all positions **
  for (let x = 2; x <= GRID_SIZE; x++) {
    for (let y = 2; y <= GRID_SIZE; y++) {
      positions.push({ x, y });
    }
  }

  shuffleArray(positions);

  let index = 0;
  flowers.forEach((flower) => {
    for (let i = 0; i < flower.quantity; i++) {
      elements.push({ ...positions[index], type: flower.type });
      index++;
    }
  });

  return elements;
}

// Map of flower types CSS classes
const flowerClassMap = {
  leaf1: "leaf1Cell",
  leaf2: "leaf2Cell",
  leaf3: "leaf3Cell",
  leaf4: "leaf4Cell",
  banana1: "banana1Cell",
  banana2: "banana2Cell",
};

// Function to draw the elements and apply classes respectively
export function drawFlowers(gameBoard, elements) {
  elements.forEach((element) => {
    const { x, y, type } = element;
    const cell = document.createElement("div");

    const flowerClass = flowerClassMap[type];
    if (flowerClass) {
      cell.classList.add(flowerClass);
    }

    cell.style.gridRow = `${y} / span 1`;
    cell.style.gridColumn = `${x} / span 1`;

    gameBoard.appendChild(cell);
  });
}
