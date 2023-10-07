import { 
  update as updateSnake, 
  draw as drawSnake, 
  SNAKE_SPEED, 
  getSnakeHead, 
  snakeIntersection 
} from "./snake.js";

import { 
  update as updateFood, 
  draw as drawFood 
} from "./food.js";

import { 
  outsideGrid, 
  drawBorderRows, 
  drawGrassAndFlowers, 
  createElements 
} from "./grid.js";

let lastRenderTime = 0;
let gameIsOver = false;

const GRASS_GIF_COUNT = 50
const FLOWER_COUNT = 15
const GRASS_STILL_COUNT = 50

const staticElements = document.getElementById("static-elements");
const dynamicElements = document.getElementById("dynamic-elements");
const yellowCircle = document.getElementById('yellow-circle')
const gameModal = document.getElementById('game-modal')

const environmentElements = createElements(GRASS_GIF_COUNT, FLOWER_COUNT, GRASS_STILL_COUNT)

yellowCircle.addEventListener('click', () => {
  gameModal.classList.add('visible')
  document.body.classList.add('game-active')
  window.requestAnimationFrame(gameLoop)
})

function gameLoop(currentTime) {
  if (gameIsOver) {
    if (confirm("You lost, press ok to restart")) {
      window.location = "/"; 
    }
    return;
  }

  window.requestAnimationFrame(gameLoop);
  const secondsPassedSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsPassedSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  render();
}

function update() {
  updateSnake();
  updateFood();
  checkGameOver();
}

// render function with dynamic and static elements so that the board clearing 
// does not effect the static elements
// for now grass and flowers are rendered dynamically 
function render() {
  dynamicElements.innerHTML = "";
  drawFood(dynamicElements);
  drawSnake(staticElements, dynamicElements);
  drawGrassAndFlowers(dynamicElements, environmentElements);
}

function checkGameOver() {
  gameIsOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

// border function called once 
drawBorderRows(staticElements);
