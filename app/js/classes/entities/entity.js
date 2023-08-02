import { checkCanvasCollision } from "../../physics/collisionDetection.js";

class Entity {
    constructor({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, health, attackDamage, ctx }) {
        this.entityCtx = ctx;
        this.entityPosition = { x: xPosition, y: yPosition };
        this.entitySpeed = { x: xSpeed, y: ySpeed };
        this.entityBaseSpeed = speed;
        this.entityDirection = { x: 0, y: 1 };
        this.entityDimensions = { width, height };
        this.entityAttackDamage = attackDamage;
        this.entityHealth = health;
        this.entityMaxHealth = health;
    }

    get ctx() { return this.entityCtx }
    get position() { return { x: this.entityPosition.x, y: this.entityPosition.y } }
    set position({ x, y }) { { this.entityPosition.x = x, this.entityPosition.y = y } }
    get speed() { return { x: this.entitySpeed.x, y: this.entitySpeed.y } }
    set speed({ x, y }) { { this.entitySpeed.x = x, this.entitySpeed.y = y } }
    get baseSpeed() { return this.entityBaseSpeed }
    get direction() { return { x: this.entityDirection.x, y: this.entityDirection.y } }
    set direction({ x, y }) { { this.entityDirection.x = x, this.entityDirection.y = y } }
    get dimensions() { return { width: this.entityDimensions.width, height: this.entityDimensions.height } }
    get attackDamage() { return this.entityAttackDamage }
    set attackDamage(num) { this.entityAttackDamage = num }
    get health() { return this.entityHealth }
    set health(num) { this.entityHealth = num }
    get maxHealth() { return this.entityMaxHealth }
    set maxHealth(num) { this.entityMaxHealth = num }


    //***********************************************************************

    //                      MOVEMENT AND DIRECTION

    //***********************************************************************

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

    takeDamage(entity) {
        console.log(this.health)
        this.health = this.health - entity.attackDamage
    }

    update() {

    }
}

export { Entity }