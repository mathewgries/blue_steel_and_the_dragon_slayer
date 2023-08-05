export default class UserInterface {
    constructor({ gameContainer, canvas, hudContainer, viewWidth, viewHeight }) {
        this.gameContainer = gameContainer;
        this.canvas = canvas;
        this.hudContainer = hudContainer;
        this.dimensions = { viewWidth, viewHeight }
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
    }

    update() {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        if (this.dimensions.viewWidth !== viewWidth || this.dimensions.viewHeight !== viewHeight) {
            this.dimensions = { viewWidth, viewHeight }
            this.gameContainer.update({ ...this.dimensions });
            this.canvas.update({ ...this.gameContainer.dimensions })
            this.hudContainer.update({ ...this.gameContainer.dimensions });
        }
    }
}