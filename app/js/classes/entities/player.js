import Entity from "./entity.js";

export default class Player extends Entity {
    constructor({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, canvas }) {
        super({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, canvas })
        this.icon = new Image()
        this.icon.src = '../../assets/images/player/kikk-sample.png'
        this.isAttackKeyPressed = false;
    }

    handleNormalMovement(keys, playerMovement) {
        this.direction = { x: 0, y: 0 };
        if (keys['w']) {
            this.direction = { x: this.direction.x, y: this.direction.y - 1 };
        }
        if (keys['s']) {
            this.direction = { x: this.direction.x, y: this.direction.y + 1 };
        }
        if (keys['a']) {
            this.direction = { x: this.direction.x - 1, y: this.direction.y };
        }
        if (keys['d']) {
            this.direction = { x: this.direction.x + 1, y: this.direction.y };
        }
        this.direction = this.normalizeDirectionVector(this.direction.x, this.direction.y);
        this.position = {
            x: this.position.x + this.direction.x * playerMovement,
            y: this.position.y + this.direction.y * playerMovement,
        };
    }

    update({ keys, deltaTime }) {
        const playerMovement = this.baseSpeed * deltaTime;
        if (!this.knockback.isActive) {
            this.handleNormalMovement(keys, playerMovement)
        }
        super.update()
        this.draw()
    }

    draw() {
        this.canvas.ctx.drawImage(
            this.icon,
            this.position.x,
            this.position.y,
            this.icon.width,
            this.icon.height
        )
    }
}