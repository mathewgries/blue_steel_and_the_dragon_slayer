export default class HudContainer {
    constructor({ width, height }) {
        this.container = document.getElementById('hud-container');

        this.borderSize = 2;
        this.dimensions = { width: 124, height: 240 };
        this.aspectRatio = this.dimensions.width / this.dimensions.height;

        this.container.style.border = `${this.borderSize}px solid black`;
        this.container.style.borderLeft = `${this.borderSize / 2}px solid black`;
        this.container.style.backgroundColor = 'lightseagreen';

        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;
        this.resize(height);
    }

    resize(height) {
        this.dimensions = {
            width: (height * this.aspectRatio) - 3,
            height: height - (this.borderSize * 2)
        };
        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;
    }

    update({ width, height }) {
        this.resize(height);
    }
}