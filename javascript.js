const canvas = document.querySelector("#canvas");
const dimensionSelector = document.querySelector("#dimension-selector");
const dimensionText = document.querySelector("#dimensions");

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

//Marking the canvas

let brushMode = "rainbow";

function markCanvas(event) {
  if (isCanvasClicked) {
    let cellClasses = event.target.classList;

    switch (brushMode) {
      case "gradient":
        if (cellClasses.contains("bg-slate-100")) {
          cellClasses.replace("bg-slate-100", "bg-slate-300");
        } else if (cellClasses.contains("bg-slate-300")) {
          cellClasses.replace("bg-slate-300", "bg-slate-500");
        } else if (cellClasses.contains("bg-slate-500")) {
          cellClasses.replace("bg-slate-500", "bg-slate-700");
        } else if (cellClasses.contains("bg-slate-700")) {
          cellClasses.replace("bg-slate-700", "bg-slate-900");
        }

        break;

      case "normal":
        cellClasses.add("bg-slate-900");
        break;

      case "rainbow":
        event.target.style.backgroundColor = getRandomHexColor();
        break;

        case "eraser":
            event.target.style.backgroundColor = null;
        cellClasses.add("bg-slate-100");
        break;

      default:
        break;
    }

    //event.target.classList.add(brushClasses);
  }
}

//Check to see if canvas is clicked or not

let isCanvasClicked = false;

canvas.addEventListener(
  "mousedown",
  () => {
    isCanvasClicked = true;
    console.log(isCanvasClicked);
  },
  true
);

canvas.addEventListener("mouseup", () => {
  isCanvasClicked = false;
  console.log(isCanvasClicked);
});

canvas.addEventListener("mouseleave", () => {
  isCanvasClicked = false;
  console.log(isCanvasClicked);
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

//store UI dimension DOM Elements

updateGridUI();

dimensionSelector.addEventListener("input", updateGridUI);

//add event listeners to all the divs that change their styling on mousedown event
//function for changing styling of div 'mark canvas'
//call that function when event on div happens.
