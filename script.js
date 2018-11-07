let gridDiv = document.getElementById("grid");
let nextButton = document.getElementById("next");

let size = 15;

let grid = [];
for (let y = 0; y < size; y++) {
    grid[y] = [];
    for (let x = 0; x < size; x++) {
        grid[y][x] = Math.floor(Math.random() * 2) == 0;
   }
}

drawGrid();

nextButton.addEventListener("click", () => {
    nextGeneration();
    drawGrid();
});

function nextGeneration() {
    let next = [];
    for (let y = 0; y < size; y++) {
        next[y] = [];
        for (let x = 0; x < size; x++) {
            let neighbors = countNeighbors(y, x);
            if (grid[y][x] == true && neighbors < 2 || neighbors > 3) {
                next[y][x] = false;
            } else if (grid[y][x] == true && neighbors >= 2 && neighbors <= 3) {
                next[y][x] = true;
            } else if (grid[y][x] == false && neighbors == 3) {
                next[y][x] = true;
            } else {
                next[y][x] = grid[y][x]
            }
        }
    }
    grid = next;
}

/*
| x - 1, y - 1 | x, y - 1 | x + 1, y - 1 |
| x - 1, y     | x, y     | x + 1, y     |
| x - 1, y + 1 | x, y + 1 | x + 1, y + 1 |
*/
function countNeighbors(y, x) {
    let counter = 0;
    y -= 1;
    if (alive(y, x)) counter++;
    x += 1;
    if (alive(y, x)) counter++;
    y += 1;
    if (alive(y, x)) counter++;
    y += 1;
    if (alive(y, x)) counter++;
    x -= 1;
    if (alive(y, x)) counter++;
    x -= 1;
    if (alive(y, x)) counter++;
    y -= 1;
    if (alive(y, x)) counter++;
    y -= 1;
    if (alive(y, x)) counter++;
    return counter;
}

function alive(y, x) {
    if (y < 0 || y > size - 1 || x < 0 || x > size - 1) {
        return false;
    } else {
        return grid[y][x];
    }
}

function drawGrid() {
    gridDiv.innerHTML = "";
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("coordinates", x + "-" + y);
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    grid[y][x] = true;
                } else {
                    grid[y][x] = false;
                }
            });
            if (grid[y][x]) {
                checkbox.checked = true;
            }
            gridDiv.appendChild(checkbox);
        }
        gridDiv.appendChild(document.createElement("br"));
    }
}