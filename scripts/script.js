const canvasContainer = document.getElementById("canvas-container");

function createDiv(gridSize) {
  for (let i = 0; i <= gridSize; i++) {
    let newDiv = document.createElement("div");

    canvasContainer.append(newDiv);
  }
}

createDiv(16);
