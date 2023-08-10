import Entity from "./entity.js";
import { checkCanvasCollision } from "../../physics/collisionDetection.js";

class Enemy extends Entity {
    constructor({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, canvas, fillColor }) {
        super({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, canvas })
        this.fillColor = fillColor
        this.hasBeenHit = false;
        this.hasBeenHitDuration = 300;
    }

    calculateNextPosition(deltaTime) {
        const nextX = this.position.x + this.speed.x * deltaTime;
        const nextY = this.position.y + this.speed.y * deltaTime;
        return { nextX, nextY };
    }

    changeDirection() {
        let randomDirection = Math.random() < 0.5 ? 1 : -1;
        const isMovingHorizontal = this.speed.y === 0 ? true : false
        const atTopEdge = this.position.y <= 0;
        const atBottomEdge = this.position.y + this.dimensions.height >= this.canvas.baseDimensions.height;
        const atLeftEdge = this.position.x <= 0;
        const atRightEdge = this.position.x + this.dimensions.width >= this.canvas.baseDimensions.width;

        if (isMovingHorizontal) {
            if (randomDirection < 0 && atTopEdge || randomDirection > 0 && atBottomEdge) {
                randomDirection *= -1
            }
            this.speed = { x: 0, y: randomDirection * this.baseSpeed }
        } else {
            if (randomDirection < 0 && atLeftEdge || randomDirection > 0 && atRightEdge) {
                randomDirection *= -1
            }
            this.speed = { x: randomDirection * this.baseSpeed, y: 0 }
        }
    }

    shouldChangeDirection(deltaTime) {
        let shouldChangeDirection = false;
        if (checkCanvasCollision(this.bounds, this.canvas)) {
            shouldChangeDirection = true;
        }
        if (Math.random() < 0.03) {
            shouldChangeDirection = true;
        }
        if (shouldChangeDirection) {
            this.changeDirection(this.canvas);
        }
        const { nextX, nextY } = this.calculateNextPosition(deltaTime);
        this.position = { x: nextX, y: nextY }
    }

    //*************************************************
    // UPDATE AND DRAW
    //*************************************************

    update(deltaTime) {
        if (!this.knockback.isActive) {
            this.shouldChangeDirection(deltaTime)
        } else {
            super.update()
        }

        this.draw()
    }

    draw() {
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height
        );
    }
}

{/************************************************************************************************* 
    
                        ENEMIES

**************************************************************************************************/}

class Zombie extends Enemy {
    constructor({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, canvas, attackDamage, fillColor }) {
        super({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, canvas, attackDamage, fillColor })
    }
}

class Skeleton extends Enemy {
    constructor({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, canvas, attackDamage, fillColor }) {
        super({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, canvas, attackDamage, fillColor })
    }
}

export { Enemy, Zombie, Skeleton };