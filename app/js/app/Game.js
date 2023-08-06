export default class Game {
    constructor({ userInterface, canvas, player, keys }) {
        this.userInterface = userInterface;
        this.canvas = canvas;
        this.player = player;
        this.deltaTime = 1 / 60;
        this.keys = keys;
        this.isAttackKeyPressed = false;
    }

    handleKeyPress() {
        if (this.keys['k'] && !this.isAttackKeyPressed) {
            this.isAttackKeyPressed = true;
        }
    }

    handleKeyRelease() {
        if (!this.keys['k']) {
            this.isAttackKeyPressed = false;
        }
    }

    render() {
        this.userInterface.update();
    }

    update() {
        this.handleKeyPress();
        this.handleKeyRelease();
        // this.player.update(this.keys, this.deltaTime);
        // Update the game state based on user input, physics, collisions, etc.
        // this.player.update(/* pass required parameters here */);
        // this.weaponSelector.update(/* pass required parameters here */);
    }
}