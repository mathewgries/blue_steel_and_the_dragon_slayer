export default class UserInterface {
    constructor({ gameContainer, canvas, hudContainer, viewWidth, viewHeight }) {
        this.gameContainer = gameContainer;
        this.canvas = canvas;
        this.hudContainer = hudContainer;
        this.dimensions = { viewWidth, viewHeight };
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        this.resize({ viewWidth, viewHeight });
    }

    resize({ viewWidth, viewHeight }) {
        this.dimensions = { viewWidth, viewHeight };
        this.gameContainer.resize({ ...this.dimensions });
        this.canvas.resize({ ...this.gameContainer.dimensions });
        this.hudContainer.resize({
            ...this.gameContainer.dimensions,
            diff: this.gameContainer.dimensions.width - this.canvas.dimensions.width
        });
    }
}