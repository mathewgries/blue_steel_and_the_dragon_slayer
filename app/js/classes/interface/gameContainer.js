export default class GameContainer {
    constructor({ viewWidth, viewHeight }) {
        this.container = document.getElementById('game-container');
        this.borderSize = 15;
        this.innerBorder = 2;
        this.dimensions = {
            width: 370 + (this.innerBorder * 3),
            height: 240 + (this.innerBorder * 2),
        };
        this.aspectRatio = this.dimensions.width / this.dimensions.height;

    }

    resize({ viewWidth, viewHeight }) {
        this.setDimensions({ viewWidth, viewHeight });
        this.resizeContainer();
        this.setMargins(viewHeight);
    }

    setDimensions({ viewWidth, viewHeight }) {
        let width = viewWidth - (viewWidth * (this.aspectRatio / 100));
        let height = (width / this.aspectRatio) - (this.borderSize * 2) + (this.innerBorder * 2);
        if (height + (this.borderSize * 2) > viewHeight) {
            height = viewHeight - (this.borderSize * 2);
            width = (viewHeight * this.aspectRatio) - (this.borderSize * 2);
        } else {
            width -= (this.borderSize * 2);
        }
        this.dimensions = { width: Math.floor(width), height: Math.floor(height) };
    }

    resizeContainer() {
        this.container.style.width = `${this.dimensions.width}px`;
        this.container.style.height = `${this.dimensions.height}px`;
    }

    setMargins(viewHeight) {
        this.container.style.margin = `${(viewHeight / 2) - ((this.dimensions.height + (this.borderSize * 2)) / 2)}px auto`;
    }
}