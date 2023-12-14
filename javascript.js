
let canvas = document.querySelector('#canvas');
let dimensionSelector = document.querySelector('#dimension-selector');










function getWidthDimension() {
    return dimensionSelector.value;
}

//let chosenWidth = getWidthDimension;



function createCanvasGrid() {
    let chosenWidth = getWidthDimension();
    console.log(chosenWidth);

    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
      }

for (let index = 0; index < chosenWidth; index++) {
    
    let row = document.createElement('div');
    row.classList.add('flex', 'flex-row', 'w-full', 'flex-1', 'gap-1');

for (let index = 0; index < chosenWidth; index++) {
    let cell = document.createElement('div');
    cell.classList.add('bg-slate-500', 'flex-1', 'h-full');

    row.appendChild(cell);
    
}

canvas.appendChild(row);
    
}


};

createCanvasGrid();

dimensionSelector.addEventListener("input", createCanvasGrid);

//createCanvasGrid(chosenWidth);