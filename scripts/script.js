const canvasContainer = document.getElementById("canvas-container");

function createDiv(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    for (let x = 0; x < gridSize; x++) {
      let newDiv = document.createElement("div");

      canvasContainer.append(newDiv);
    }
  }
}

function canvasWrite(event) {
  console.log(event.currentTarget);

  event.currentTarget.style.backgroundColor = "black";
}

createDiv(16);

for (const child of canvasContainer.children) {
  child.addEventListener("mouseover", (event) => {
    canvasWrite(event);
  });
}
