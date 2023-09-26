import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
} from "./elements/snake.js";

import { update as updateFood, draw as drawFood } from "./elements/food.js";

import { outsideGrid } from "./elements/grid.js";
import { snakeIntersection } from "./elements/snake.js";
import { getSnakeHead } from "./elements/snake.js";

let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lost, press ok to restart")) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
