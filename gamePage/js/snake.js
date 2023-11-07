import { getInputDirection } from "./input.js";

const SNAKE_SPEED = 10;

let snakeBody = [
  { x: 11, y: 11, dir: { x: 1, y: 0 } }, // head
  { x: 10, y: 11, dir: { x: 1, y: 0 } }, // body
  { x: 9, y: 11, dir: { x: 1, y: 0 } }, // body
  { x: 8, y: 11, dir: { x: 1, y: 0 } }, // tail
];

let newSnakeSegments = 0;

export {
  SNAKE_SPEED,
  update,
  draw,
  getSnakeHead,
  expandSnake,
  onSnake,
  snakeIntersection,
};

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

function draw(dynamicElements) {
  snakeBody.forEach((segment, index) => {
    drawSegment(dynamicElements, segment, index);
  });
}

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

function getSnakeHead() {
  return snakeBody[0];
}

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

function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Function to add segments to the snake
function addSegments() {
  for (let i = 0; i < newSnakeSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSnakeSegments = 0;
}
