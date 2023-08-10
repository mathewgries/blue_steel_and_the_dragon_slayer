export default class Canvas {
    constructor({ width, height }) {
        this.container = document.getElementById("canvas-container");
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.borderSize = 2;
        this.baseDimensions = { width: 256, height: 240 }
        this.aspectRatio = this.baseDimensions.width / this.baseDimensions.height;
        this.dimensions = {
            width: Math.floor((height * this.aspectRatio) - 3),
            height: Math.floor(height - (this.borderSize * 2))
        }
        this.cellSize = 16
        this.scale = this.dimensions.width / this.baseDimensions.width
        this.setScale()
    }

    resize({ width, height }) {
        this.clear();
        this.setDimensions({ width, height });
        this.resizeContainer()
        this.resizeCanvas()
        this.ctxParameters()
        this.setScale()
        this.drawGrid();
    }

    setDimensions({ width, height }) {
        this.dimensions = {
            width: Math.floor((height * this.aspectRatio) - 3),
            height: Math.floor(height - (this.borderSize * 2))
        }
    }

    resizeContainer() {
        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;
    }

    resizeCanvas() {
        this.canvas.width = this.dimensions.width;
        this.canvas.height = this.dimensions.height;
    }

    ctxParameters() {
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }

    setScale() {
        this.scale = this.dimensions.width / this.baseDimensions.width
        this.ctx.scale(this.scale, this.scale);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    update() {
        this.clear();
        this.drawGrid();
    }

    drawGrid() {
        this.ctx.strokeStyle = 'lightgray'; // Set the color of the grid lines
        this.ctx.lineWidth = 1; // Set the line width to 1 for sharp grid lines
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