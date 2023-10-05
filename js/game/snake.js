import { getInputDirection } from "./input.js";

const SNAKE_SPEED = 10;
const SNAKE_BODY_CLASS = "snakeBody";

let snakeBody = [{ x: 11, y: 11 }];
let newSnakeSegments = 0;

const headElement = document.getElementById("snakeHead");
const tailElement = document.getElementById("snakeTail");

export {
  SNAKE_SPEED,
  update,
  draw,
  getSnakeHead,
  expandSnake,
  onSnake,
  snakeIntersection,
};

// draw and update functions subject to change as the snake body needs unqiue styles
// when it curves, each direction needs a unique curve style and detection to apply the style

function update() {
  addSegments();

  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

function draw(staticElements, dynamicElements) {
  snakeBody.forEach((segment, index) => {
    drawSegment(staticElements, dynamicElements, segment, index);
  });
}

function drawSegment(staticElements, dynamicElements, segment, index) {
  let snakeElement;
  if (index === 0) {
    snakeElement = headElement;
    staticElements.appendChild(snakeElement);
  } else if (index === snakeBody.length - 1) {
    snakeElement = tailElement;
    staticElements.appendChild(snakeElement);
  } else {
    snakeElement = document.createElement("div");
    snakeElement.classList.add(SNAKE_BODY_CLASS);
    dynamicElements.appendChild(snakeElement);
  }

  snakeElement.style.gridRowStart = segment.y;
  snakeElement.style.gridColumnStart = segment.x;
}

function getSnakeHead() {
  return snakeBody[0];
}

function expandSnake(amount) {
  newSnakeSegments += amount;
}

// function to determine if snake is on itself,
// object type added as a argument in order to ignore the head otherwise will constantly return true
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

// adds segments by pushing onto the last element in the snake body
// snake segments variable reset to 0 in order to prevent endless appends
function addSegments() {
  for (let i = 0; i < newSnakeSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSnakeSegments = 0;
}
