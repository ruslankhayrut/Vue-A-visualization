class Cell {
    constructor(row, col) {
        this.row = row,
        this.col = col
        this.weight = 0
        this.distance = 0
    }

    cost() {
        return this.weight + this.distance
    }

}

Cell.prototype.toString = function cellToString() {
    return `(${this.row}, ${this.col})`
}


function are_equals(cell1, cell2) {
    return cell1.row == cell2.row && cell1.col == cell2.col
}

function pass_weight(src, dest) {
    return src.row == dest.row || src.col == dest.col ? 10: 14
}

function distance(src, dest) {
    return (Math.abs(src.row - dest.row) + Math.abs(src.col - dest.col)) * 10
}

/**
 * astar algo
 * @param  {List<String>} grid 
 * @param {Cell} start
 * @param {Cell} finish
 * @return {List<Cell>} List of Cells in path 
 */

export function astar(grid, start, finish) {
    var activeCell = start

    var path = []

    var openList = []
    var closedList = []

    while (!are_equals(activeCell, finish)) {
        path.push(activeCell)

        acIndex = openList.indexOf(activeCell)
        if (acIndex != -1) {
            openList.splice(acIndex, 1)
        }
        closedList.push(activeCell)

        for (let row = activeCell.row - 1; row < activeCell.row + 2; row++) {
            for (let col = activeCell.col -1; col < activeCell.col + 2; col++) {
                try {
                    if (grid[row][col] != '*') {
                        const cell = new Cell(row, col)
                        if (closedList.filter(c => are_equals(cell, c)).length == 0) {
                            openList.push(cell)
                        }
                    }
                } catch (error) {
                    
                }
            }
        }

        for (let cell of openList) {
            const pwFromThisCell = pass_weight(activeCell, cell) + activeCell.weight
            if (!cell.weight) {
                cell.weight = pwFromThisCell
            }
            else if (cell.weight > pwFromThisCell) {
                cell.weight = pwFromThisCell
            }

            if (!cell.distance) {
                cell.distance = distance(finish, cell)
            }
        }

        openList.sort((c1, c2) => c1.cost() - c2.cost())
        activeCell = openList[0]
    }
    
    path.push(activeCell)
    return path
}

// const gridStr = `
// .......
// ..**...
// ...*...
// .......
// .......
// `
// const grid = []
// for (let line of gridStr.split('\n')) {
//     if (line) {
//         const ll = line.split('')
//         grid.push(ll)
//     }
// }



// startCell = new Cell(2, 1)
// finishCell = new Cell(2, 5)

// path = astar(grid, startCell, finishCell)
// for (let cell of path) {
//     console.log(cell.toString())
// }

