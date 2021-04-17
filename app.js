class Cell {
    constructor(row, col) {
        this.row = row
        this.col = col
        this.weight = 0
        this.distance = 0
        this.isPassable = true
        this.isInPath = false
    }

    cost() {
        return this.weight + this.distance
    }

}

const App = {
    data() {
        return {
            grid: [],
            width: 5,
            height: 5,
            isFound: false,
            startRow: 0,
            startCol: 0,
            finishRow: 4,
            finishCol: 4
        }
    },

    methods: {
        createGrid() {
            this.isFound = false
            this.grid = []
            for (let row = 0; row < this.height; row++) {
                var r = []
                for (let col = 0; col < this.width; col++) {
                    r.push(new Cell(row, col))
                }
                this.grid.push(r)
            }
        },

        createOrRemoveWall(cell) {
            if (this.are_equals(cell, this.startCell)) {
                return alert("Can't assign wall to start cell")
            }

            if (this.are_equals(cell, this.finishCell)) {
               return alert("Can't assign wall to finish cell")
            }

            cell.isPassable = !cell.isPassable
            return
        },

        are_equals(cell1, cell2) {
            return cell1.row == cell2.row && cell1.col == cell2.col
        },

        pass_weight(src, dest) {
            return src.row == dest.row || src.col == dest.col ? 10: 14
        },

        distance(src, dest) {
            return (Math.abs(src.row - dest.row) + Math.abs(src.col - dest.col)) * 10
        },

        findPath() {

            var activeCell = this.startCell

            var openList = []
            var closedList = []
            var path = []

            while (!this.are_equals(activeCell, this.finishCell)) {
                activeCell.isInPath = true
                path.push(activeCell)

                acIndex = openList.indexOf(activeCell)
                if (acIndex != -1) {
                    openList.splice(acIndex, 1)
                }
                closedList.push(activeCell)

                for (let row = activeCell.row - 1; row < activeCell.row + 2; row++) {
                    for (let col = activeCell.col -1; col < activeCell.col + 2; col++) {
                        try {
                            if (this.grid[row][col].isPassable) {
                                if (closedList.filter(c => this.are_equals(this.grid[row][col], c)).length == 0) {
                                    openList.push(this.grid[row][col])
                                }
                            }
                        } catch (error) {
                            
                        }
                    }
                }

                for (let cell of openList) {
                    const pwFromThisCell = this.pass_weight(activeCell, cell) + activeCell.weight
                    if (!cell.weight || cell.weight > pwFromThisCell) {
                        cell.weight = pwFromThisCell
                    }

                    if (!cell.distance) {
                        cell.distance = this.distance(cell, this.finishCell)
                    }
                }

                openList.sort((c1, c2) => c1.cost() - c2.cost())
                activeCell = openList[0]
            }
            this.finishCell.isInPath = true
            this.isFound = true
            path.push(activeCell)
            console.log(path)
        }
    },

    computed: {



        startCell() {
            return this.grid ? this.grid[this.startRow][this.startCol] : null
        },

        finishCell() {
            return this.grid ? this.grid[this.finishRow][this.finishCol] : null
        }
    },

    beforeMount() {
        this.createGrid()
    }

}

Vue.createApp(App).mount("#app")
