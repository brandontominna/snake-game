import { getInputDirection } from "./input.js";

// Define the speed of the snake
const SNAKE_SPEED = 10;

// Initialize the snake body
let snakeBody = [
  { x: 11, y: 11, dir: { x: 1, y: 0 } }, // Head
  { x: 10, y: 11, dir: { x: 1, y: 0 } }, // Body
  { x: 9, y: 11, dir: { x: 1, y: 0 } }, // Body
  { x: 8, y: 11, dir: { x: 1, y: 0 } }, // Tail
];

// Initialize the new snake segments
let newSnakeSegments = 0;

// Function to update the snake's position
function update() {
  addSegments();

  const inputDirection = getInputDirection();
  // Only runs when the direction changes
  if (inputDirection.x !== 0 || inputDirection.y !== 0) {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    snakeBody[0].dir = inputDirection;
  }
}

// Function to draw the snake
function draw(dynamicElements) {
  snakeBody.forEach((segment, index) => {
    drawSegment(dynamicElements, segment, index);
  });
}

// Function to draw a segment of the snake
function drawSegment(dynamicElements, segment, index) {
  let snakeElement = document.createElement("div");
  dynamicElements.appendChild(snakeElement);

  snakeElement.style.gridRowStart = segment.y;
  snakeElement.style.gridColumnStart = segment.x;

  // Determine the class based on the direction
  let directionClass = getDirectionClass(segment.dir);

  // Check if the snake has made a turn
  if (index > 0) {
    let prevSegment = snakeBody[index - 1];
    let prevDirectionClass = getDirectionClass(prevSegment.dir);
    if (directionClass !== prevDirectionClass) {
      // The snake has made a turn, add a specific class
      directionClass += "-to-" + prevDirectionClass;
    }
  }

  // Add additional classes for the head, body, and tail
  if (index === 0) {
    snakeElement.classList.add("snakeHead-" + directionClass);
  } else if (index === snakeBody.length - 1) {
    // For the tail, determine the direction based off the previous segment
    let prevSegment = snakeBody[index - 1];
    let prevDirectionClass = getDirectionClass(prevSegment.dir);
    snakeElement.classList.add("snakeTail-" + prevDirectionClass);
  } else {
    snakeElement.classList.add("snakeBody-" + directionClass);
  }
}

// Function to get the direction
function getDirectionClass(dir) {
  if (dir.x > 0) {
    return "right";
  } else if (dir.x < 0) {
    return "left";
  } else if (dir.y > 0) {
    return "down";
  } else if (dir.y < 0) {
    return "up";
  } else {
    return "right";
  }
}

// Function to get the head of the snake
function getSnakeHead() {
  return snakeBody[0];
}

// Function to expand the snake
function expandSnake(amount) {
  newSnakeSegments += amount;
}

// Function to determine if the snake hits itself
function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

// Function to determine if the snake hits itself at the head
function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

// Function to check if two positions are equal
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Function to add new segments to the snake
function addSegments() {
  for (let i = 0; i < newSnakeSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSnakeSegments = 0;
}

// Export the necessary functions and constants
export {
  SNAKE_SPEED,
  update,
  draw,
  getSnakeHead,
  expandSnake,
  onSnake,
  snakeIntersection,
};
