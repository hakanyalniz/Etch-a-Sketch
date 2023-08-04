// All of the divs are created inside the container
const canvasContainer = document.getElementById("canvas-container");
// Is needed to check whether the user has pressed down the mouse button or released it yet
// We need this so the canvas only draws when the mouse is hold down
let mouseCondition = false;

// Is responsible for creating the divs with the given gridSize
// The way the grids look is handled by CSS
function createDiv(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    for (let x = 0; x < gridSize; x++) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "canvas-div");

      canvasContainer.append(newDiv);
    }
  }
}

// Is responsible for drawing, makes the backgroundColor to black
// Later on add a way of changing the color from UI

function canvasWrite(event) {
  console.log(event.currentTarget);

  event.target.style.backgroundColor = "black";
}

// Change the below parameter to change the gridSize
// Later on add a way of changing the size from UI
// When the below changes the div box sizes remain same so it overflows
// Need to find a way to fix that
createDiv(16);

// New way of adding event listener. Way more efficient than the previous way
// which added event listener to every div created under the canvas
// this method makes use of event propagation, the bubble up stuff
// and only changes the color when the class matches
canvasContainer.addEventListener("mouseover", function (event) {
  if (event.target.className === "canvas-div" && mouseCondition == true) {
    canvasWrite(event);
  }
});

// Checks mouse condition so we can only draw when the mouse is pressed down,
// which is indicated by mouseCondition
canvasContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();
  mouseCondition = true;
});
canvasContainer.addEventListener("mouseup", () => {
  mouseCondition = false;
});
