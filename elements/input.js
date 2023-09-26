

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (lastInputDirection.y === 0) {
      inputDirection = { x: 0, y: -1 };
    }
  } else if (e.key === "ArrowDown") {
    if (lastInputDirection.y === 0) {
      inputDirection = { x: 0, y: 1 };
    }
  } else if (e.key === "ArrowLeft") {
    if (lastInputDirection.x === 0) {
      inputDirection = { x: -1, y: 0 };
    }
  } else if (e.key === "ArrowRight") {
    if (lastInputDirection.x === 0) {
      inputDirection = { x: 1, y: 0 };
    }
  }
});

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}










// window.addEventListener("keydown", (e) => {
//     switch (e.key) {
//       case "ArrowUp":
//         if (lastInputDirection.y !== 0) break;
//         inputDirection = { x: 0, y: -1 };
//         break;
  
//       case "ArrowDown":
//         if (lastInputDirection.y !== 0) break;
//         inputDirection = { x: 0, y: 1 };
//         break;
  
//       case "ArrowLeft":
//         if (lastInputDirection.x !== 0) break;
//         inputDirection = { x: -1, y: 0 };
//         break;
  
//       case "ArrowRight":
//         if (lastInputDirection.x !== 0) break;
//         inputDirection = { x: 1, y: 0 };
//         break;
//     }
//   });
  