let gridDiv = document.getElementById("grid");
let nextButton = document.getElementById("next");

let size = 15;

let grid = [];
for (let x = 0; x < size; x++) {
    grid[x] = [];
    for (let y = 0; y < size; y++) {
        grid[x][y] = Math.floor(Math.random() * 2) == 0;
   }
}

drawGrid();

nextButton.addEventListener("click", () => {
    nextGeneration();
    drawGrid();
});

function nextGeneration() {
    let next = [];
    for (let x = 0; x < size; x++) {
        next[x] = [];
        for (let y = 0; y < size; y++) {
            let neighbors = countNeighbors(x, y);
            if (grid[x][y] == true && neighbors < 2 || neighbors > 3) {
                next[x][y] = false;
            } else if (grid[x][y] == true && neighbors >= 2 && neighbors <= 3) {
                next[x][y] = true;
            } else if (grid[x][y] == false && neighbors == 3) {
                next[x][y] = true;
            } else {
                next[x][y] = grid[x][y]
            }
        }
    }
    grid = next;
}

function countNeighbors(x, y) {
    let counter = 0;
    x -= 1;
    if (alive(x, y)) counter++;
    y += 1;
    if (alive(x, y)) counter++;
    x += 1;
    if (alive(x, y)) counter++;
    x += 1;
    if (alive(x, y)) counter++;
    y -= 1;
    if (alive(x, y)) counter++;
    y -= 1;
    if (alive(x, y)) counter++;
    x -= 1;
    if (alive(x, y)) counter++;
    x -= 1;
    if (alive(x, y)) counter++;
    return counter;
}

function alive(x, y) {
    if (x < 0 || x > size - 1 || y < 0 || y > size - 1) {
        return false;
    } else {
        return grid[x][y];
    }
}

function drawGrid() {
    gridDiv.innerHTML = "";
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("x", x);
            checkbox.setAttribute("y", y);
            if (grid[x][y]) {
                checkbox.checked = true;
           }
            gridDiv.appendChild(checkbox);
        }
        gridDiv.appendChild(document.createElement("br"));
    }
}