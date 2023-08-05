const canvasContainer = document.getElementById("canvas-container"); // // All of the divs are created inside the container
let clearButton = document.getElementById("clear-button");
let colorPicker = document.getElementById("colorPicker");
let sizePicker = document.getElementById("size-button");
let eraserButton = document.getElementById("eraser-button");
let addColor = document.getElementById("palette-button");
let colorPalette = document.getElementById("colorPalette"); // This one references the container

let ordinaryColorArray = []; // This one is a pure JS array, does not have connection to the HTML
let paletteBoxes = colorPalette.children; // This one extracts the children, which are the 6 color boxes, of the palette on HTML
let currentColor = "black"; // default color is black
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
  event.target.style.backgroundColor = currentColor;
}

// Removes the style attribute and clears the canvas
function clearCanvas() {
  for (const child of canvasContainer.children) {
    child.style.backgroundColor = "";
  }
}

function removeCanvas() {
  while (canvasContainer.firstChild) {
    canvasContainer.removeChild(canvasContainer.firstChild);
  }
}

function changeColor(color = null) {
  // Below is added to check if a color is manually given by something else
  // such as eraser
  if (color != null) {
    currentColor = color;
  } else {
    currentColor = colorPicker.value;
  }
}

function changeSize() {
  let canvasHeight = canvasContainer.offsetHeight;
  let size = prompt("Please enter canvas size! (exp: 16 means 16x16)");
  removeCanvas();
  createDiv(size);

  let canvasDivHeight = canvasHeight / size; // This allows us to size the boxes just right so they fit inside the canvas
  let canvasDiv = document.querySelectorAll(".canvas-div");

  for (const childDiv of canvasDiv) {
    childDiv.style.width = `${canvasDivHeight}px`;
    childDiv.style.height = `${canvasDivHeight}px`;
  }
}

function addColorPalette() {
  let colorPaletteArray = Array.from(paletteBoxes);

  ordinaryColorArray.unshift(colorPicker.value); // All the selected colors go to this array

  // Only cycles though the 6 elements of ordinaryColorArray, the rest are ignored
  // The colorPaletteArray has the six color boxes from HTML, they are cycled through the same time and changed
  // to the colors present in the ordinaryColorArray
  // One key distinction, it appears as if the color palette is adding colors one by one in UI but in reality
  // it updates the whole thing
  for (let i = 0; i < 6; i++) {
    colorPaletteArray[i].style.backgroundColor = ordinaryColorArray[i];
  }
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

// Event listeners

// Checks mouse condition so we can only draw when the mouse is pressed down,
// which is indicated by mouseCondition
canvasContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();
  mouseCondition = true;
});
canvasContainer.addEventListener("mouseup", () => {
  mouseCondition = false;
});

// The button responsible for clearing the canvas, calls clearCanvas
clearButton.addEventListener("click", () => {
  clearCanvas();
});

// Changes color
colorPicker.addEventListener("input", function () {
  changeColor();
});

// Changes canvas size
sizePicker.addEventListener("click", function (event) {
  changeSize();
});

// An eraser, just calls changeColor with white
eraserButton.addEventListener("click", function (event) {
  changeColor("white");
});

// Adds color to the palette
addColor.addEventListener("click", function (event) {
  addColorPalette();
});

colorPalette.addEventListener("click", function (event) {
  if (event.target.className === "palBox") {
    changeColor(event.target.style.backgroundColor);
  }
});
