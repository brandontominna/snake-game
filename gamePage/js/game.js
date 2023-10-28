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
  drawGrid
} from "./grid.js";

import {
  drawBorders
} from './borders.js'

import {
  createElements, 
  drawFlowers, 
  flowerData
} from './flowers.js'


let lastRenderTime = 0;
let gameIsOver = false;

const staticElements = document.getElementById("static-elements");
const dynamicElements = document.getElementById("dynamic-elements");
const yellowCircle = document.getElementById('yellow-circle')
const gameModal = document.getElementById('game-modal')

yellowCircle.addEventListener('click', () => {
  gameModal.classList.add('visible')
  yellowCircle.style.display = 'none'; 
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

// render function with dynamic and static elements so that the board clearing does not effect static elements
function render() {
  dynamicElements.innerHTML = "";
  drawFood(dynamicElements);
  drawSnake(staticElements, dynamicElements);
}

function checkGameOver() {
  gameIsOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

// borders and grid called once
drawBorders(staticElements);
drawGrid(staticElements)

// flower generation called once
const environmentElements = createElements(flowerData)
drawFlowers(staticElements, environmentElements);
