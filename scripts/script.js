// All of the divs are created inside the container
const canvasContainer = document.getElementById("canvas-container");

// Is responsible for creating the divs with the given gridSize
// The way the grids look is handled by CSS
function createDiv(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    for (let x = 0; x < gridSize; x++) {
      let newDiv = document.createElement("div");

      canvasContainer.append(newDiv);
    }
  }
}

// Is responsible for drawing, makes the backgroundColor to black
// Later on add a way of changing the color from UI

function canvasWrite(event) {
  console.log(event.currentTarget);

  event.currentTarget.style.backgroundColor = "black";
}

// Change the below parameter to change the gridSize
// Later on add a way of changing the size from UI
createDiv(16);

// Adds the event listeners to each child element of the canvasContainer
// and calls canvasWrite on them when event is triggered
for (const child of canvasContainer.children) {
  child.addEventListener("mouseover", (event) => {
    canvasWrite(event);
  });
}
