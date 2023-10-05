import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";

import { outsideGrid, drawBorderRows, drawRocksAndFlowers, createElements } from "./grid.js";

let lastRenderTime = 0;
const staticElements = document.getElementById("static-elements");
const dynamicElements = document.getElementById("dynamic-elements");
let gameIsOver = false;

const environmentElements = createElements(50, 15, 50)

drawBorderRows(staticElements);

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

  updateGame();
  renderGame();
}

window.requestAnimationFrame(gameLoop);

function updateGame() {
  updateSnake();
  updateFood();
  checkGameOver();
}

function renderGame() {
  dynamicElements.innerHTML = "";
  drawFood(dynamicElements);
  drawSnake(staticElements, dynamicElements);
  drawRocksAndFlowers(dynamicElements, environmentElements);
}

function checkGameOver() {
  gameIsOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

