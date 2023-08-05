import { checkCanvasCollision } from "../../physics/collisionDetection.js";

export default class Entity {

    // #region Constructor
    constructor({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, health, attackDamage, canvas }) {
        this.canvas = canvas;
        this.position = { x: xPosition, y: yPosition };
        this.speed = { x: xSpeed, y: ySpeed };
        this.baseSpeed = speed;
        this.direction = { x: 0, y: 1 };
        this.dimensions = { width, height };
        this.attackDamage = attackDamage;
        this.health = health || null;
        this.maxHealth = health || null;
    }
    // #endregion

    // #region Movement and Direction
    normalizeDirectionVector(xDirection, yDirection) {
        let x = xDirection
        let y = yDirection
        const length = Math.sqrt(x * x + y * y);
        if (length !== 0) {
            x /= length;
            y /= length;
        }
        return { x, y }
    }

    get bounds() {
        return {
            left: this.position.x,
            right: this.position.x + this.dimensions.width,
            top: this.position.y,
            bottom: this.position.y + this.dimensions.height,
        }
    }
    // #endregion

    // #region Attack and Damage
    takeDamage(entity) {
        this.health = this.health - entity.attackDamage
    }

    // #endregion

    update() { }
}