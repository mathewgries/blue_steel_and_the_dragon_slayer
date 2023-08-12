export default class Shovel {
    constructor({ xPosition, yPosition, width, height, name, type, icon, canvas, folderPath }) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.type = type;
        this.name = name;
        this.icon = icon;
        this.position = { x: xPosition, y: yPosition };
        this.dimensions = { width, height };
    }
}