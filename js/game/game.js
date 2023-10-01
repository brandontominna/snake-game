import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";

import { outsideGrid, drawBorderRows } from "./grid.js";
import { snakeIntersection } from "./snake.js";
import { getSnakeHead } from "./snake.js";

let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lost, press ok to restart")) {
      window.location = "../index.html";
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
  gameBoard.innerHTML = ""; // Clear the game board

  // Draw the snake and food on the remaining grid cells
  drawSnake(gameBoard);
  drawFood(gameBoard);

  drawBorderRows(gameBoard)
}



function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}



