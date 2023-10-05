import { onSnake, expandSnake } from "./snake.js";
import { getRandomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

// function to detect if snake eats the food
// unique URL with random query string is added to the food
// this is in order to prevent the brower from storing the gif in its memory/cache
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    const foodElement = document.getElementById("food");
    foodElement.style.backgroundImage = `url('../images/meme.gif?${Math.random()}')`;
  }
}

const foodElement = document.getElementById("food");

export function draw(gameBoard) {
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition = { x: 15, y: 15 };

  while (onSnake(newFoodPosition)) {
    newFoodPosition = getRandomGridPosition();
  }

  return newFoodPosition;
}
