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
const gameBoard = document.getElementById("game-board");
let gameIsOver = false;

const environmentElements = createElements(50, 15, 50)

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
  gameBoard.innerHTML = "";

  drawFood(gameBoard);
  drawSnake(gameBoard);
  drawBorderRows(gameBoard);
  drawRocksAndFlowers(gameBoard, environmentElements);
}

function checkGameOver() {
  gameIsOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
