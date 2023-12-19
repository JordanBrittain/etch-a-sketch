const canvas = document.querySelector("#canvas");
const dimensionSelector = document.querySelector("#dimension-selector");
const dimensionText = document.querySelector("#dimensions");
const colorInput = document.querySelector("#color-input");
const clearButton = document.querySelector("#clear-button");



function updateDimensionUI(chosenWidth) {
  dimensionText.textContent = chosenWidth + " x " + chosenWidth;
}

function getWidthDimension() {
  return dimensionSelector.value;
}

//brushClasses = switch statement based on brushMode

let brushClasses = "bg-red-500";
//let brushClasses =

//create random color

function getRandomHexColor() {
  // Storing all letter and digit combinations
  // for html color code
  let letters = "0123456789ABCDEF";

  // HTML color code starts with #
  let color = "#";

  // Generating 6 times as HTML color code
  // consist of 6 letter or digits
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  console.log(color);
  return color;
}

//Button Toggle
//add event listenders to the buttons
//when button is clicked pass in id
//switch brushmode variable based on id
//toggle some classes on the button that was clicked
//toggle some classes on the buttons that weren't clicked

let brushMode = "normal";

function handleModeChange(event) {
  
  brushMode = event.target.id;
  
  brushModeButtons.forEach((button) => {
    button.classList.remove("!bg-slate-900", "!text-slate-50");
  });

  event.target.classList.add("!bg-slate-900", "!text-slate-50");

}

const brushModeButtons = document.querySelectorAll("div#brush-mode-controls > button");

brushModeButtons.forEach((button) => {
  button.addEventListener("click", handleModeChange);
});

//Marking the canvas




let brushColor = colorInput.value;

function handleColorChange() {
brushColor = colorInput.value;
};

colorInput.addEventListener("input", handleColorChange);

console.log(colorInput.value);




function markCanvas(event) {
  if (isCanvasClicked) {
    let cellClasses = event.target.classList;
    let cellStyle = event.target.style;

    switch (brushMode) {
      case "gradient":
        cellStyle.backgroundColor = brushColor;
        let currentOpacity = cellStyle.opacity;

        switch (currentOpacity) {
          case "0.2":
            cellStyle.opacity = 0.4;
            break;

          case "0.4":
            cellStyle.opacity = 0.6;
            break;

          case "0.6":
            cellStyle.opacity = 0.8;
            break;

          case "0.8":
            cellStyle.opacity = 1;
            break;

          case "1":
            cellStyle.opacity = 1;
            break;

          default:
            cellStyle.opacity = 0.2;
            break;
        }

        break;

      case "normal":
        cellStyle.backgroundColor = brushColor;
        cellStyle.opacity = 1;
        break;

      case "rainbow":
        cellStyle.backgroundColor = getRandomHexColor();
        break;

      case "eraser":
        event.target.style.backgroundColor = null;
        cellClasses.add("bg-slate-100");
        break;

      default:
        break;
    }
  }
}

//Check to see if canvas is clicked or not

let isCanvasClicked = false;

canvas.addEventListener(
  "mousedown",
  () => {
    isCanvasClicked = true;
  },
  true
);

canvas.addEventListener("mouseup", () => {
  isCanvasClicked = false;
});

canvas.addEventListener("mouseleave", () => {
  isCanvasClicked = false;
});

//Updating the canvas

function updateGridUI() {
  let chosenWidth = getWidthDimension();
  updateDimensionUI(chosenWidth);
  console.log(chosenWidth);

  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }

  for (let index = 0; index < chosenWidth; index++) {
    let row = document.createElement("div");
    row.classList.add("flex", "flex-row", "w-full", "flex-1", "gap-1");

    for (let index = 0; index < chosenWidth; index++) {
      let cell = document.createElement("div");
      cell.classList.add("bg-slate-100", "flex-1", "h-full");
      cell.addEventListener("mouseover", markCanvas);
      cell.addEventListener("mousedown", markCanvas);

      row.appendChild(cell);
    }

    canvas.appendChild(row);
  }
}

clearButton.addEventListener("click", updateGridUI);

updateGridUI();

dimensionSelector.addEventListener("input", updateGridUI);
