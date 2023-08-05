export default class Canvas {
    constructor({ width, height }) {
        this.container = document.getElementById("canvas-container");
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.borderSize = 2;
        this.dimensions = { width: 256, height: 240 }
        this.aspectRatio = this.dimensions.width / this.dimensions.height;

        this.container.style.border = `${this.borderSize}px solid black`;
        this.container.style.borderRight = `${this.borderSize / 2}px solid black`;
        this.container.style.backgroundColor = 'lightcyan';
        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;

        this.canvas.width = this.dimensions.width;
        this.canvas.height = this.dimensions.height;
        this.canvas.style.width = this.dimensions.width;
        this.canvas.style.height = this.dimensions.height;

        this.gridColumns = 16;
        this.cellSize = this.dimensions.width / this.gridColumns
        this.scale = this.dimensions.width / this.cellSize / this.gridColumns
        this.resize(height);
        this.drawGrid();
    }

    resize(height) {
        this.dimensions = {
            width: (height * this.aspectRatio) - 3,
            height: height - (this.borderSize * 2)
        }
        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;
        this.canvas.style.width = `${this.dimensions.width}px`;
        this.canvas.style.height = `${this.dimensions.height}px`;
        this.canvas.width = this.dimensions.width;
        this.canvas.height = this.dimensions.height;
        this.setScale()
    }

    setScale() {
        this.cellSize = this.dimensions.width / this.gridColumns
        this.scale = this.dimensions.width / this.cellSize / this.gridColumns
        this.ctx.scale(this.scale, this.scale);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    update({ width, height }) {
        this.clear();
        this.resize(height);
        this.drawGrid();
    }

    drawGrid() {
        this.ctx.strokeStyle = 'lightgray'; // Set the color of the grid lines
        this.ctx.lineWidth = 5; // Set the line width to 1 for sharp grid lines
        // Draw vertical grid lines
        for (let x = 0; x <= this.dimensions.width; x += this.cellSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.dimensions.height);
            this.ctx.stroke();
        }
        // Draw horizontal grid lines
        for (let y = 0; y <= this.dimensions.height; y += this.cellSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.dimensions.width, y);
            this.ctx.stroke();
        }
    }
}