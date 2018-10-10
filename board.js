class Board {
    constructor(params) {
        this.width = params.width
        this.height = params.height

        // Instead of this.width/height
        this.dim = {x: params.width, y: params.height}
        
        this.cellSize = params.cellSize
        this.grid = this.calcGridSize(this.width, this.height, this.cellSize);
        this.midpoint = {
            x: Math.floor(this.grid.x / 2),
            y: Math.floor(this.grid.y / 2)
        }
    }

    calcGridSize(width, height, cellSize) {
        const x = (width - (width % cellSize)) / cellSize;
        const y = (height - (height % cellSize)) / cellSize;
        return {x, y}
    }
}