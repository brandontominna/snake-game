import { onSnake, expandSnake } from "./snake.js";
import { getRandomGridPosition } from "./grid.js";

// Expansion rate constant (will be dynamic later)
const EXPANSION_RATE = 1;
const foodElement = document.getElementById("food");

// Score Keeper
let score = 0
const scoreElement = document.getElementById('score');

// Initialize random food coordinates
let food = getRandomFoodPosition();

// Function to detect if snake eats the food
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);

    food = getRandomFoodPosition();
    
    score += 5;
    scoreElement.innerText = `Score: ${score}`;

    updateFoodElement();
  }
}

// Function to prevent browser caching of food gif
function updateFoodElement() {
  foodElement.style.backgroundImage = `url('../images/gridImages/monkey2.gif?${Math.random()}')`;
}

// Function to render the food styles
export function draw(gameBoard) {
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;

  gameBoard.appendChild(foodElement);
}

// Function to randomly generate a new food position
function getRandomFoodPosition() {
  let newFoodPosition = { x: 15, y: 15 };

  while (onSnake(newFoodPosition)) {
    newFoodPosition = getRandomGridPosition();
  }

  return newFoodPosition;
}
