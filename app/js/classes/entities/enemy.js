import { Entity } from "./entity.js";
import { checkCanvasCollision } from "../../physics/collisionDetection.js";

class Enemy extends Entity {
    //*************************************************
    // INITIALIZE AND POSITIONING
    //*************************************************
    constructor({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, health, attackDamage, ctx, fillColor }) {
        super({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, health, attackDamage, ctx })
        this.fillColor = fillColor
        this.hasBeenHit = false;
        this.hasBeenHitDuration = 100;
    }

    setHasBeenHit(bool) { this.hasBeenHit = bool }
    getHasBeenHit() { return this.hasBeenHit }
    getHasBeenHitDuration() { return this.hasBeenHitDuration }

    // Function to calculate the next position without applying it directly
    calculateNextPosition(deltaTime) {
        const nextX = this.position.x + this.speed.x * deltaTime;
        const nextY = this.position.y + this.speed.y * deltaTime;
        return { nextX, nextY };
    }

    changeDirection(canvas) {
        let randomDirection = Math.random() < 0.5 ? 1 : -1;
        const isMovingHorizontal = this.speed.y === 0 ? true : false
        const atTopEdge = this.position.y <= 0;
        const atBottomEdge = this.position.y + this.dimensions.height >= canvas.height;
        const atLeftEdge = this.position.x <= 0;
        const atRightEdge = this.position.x + this.dimensions.width >= canvas.width;

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

    //*************************************************
    // UPDATE AND DRAW
    //*************************************************

    update(deltaTime, ctx, canvas) {
        let shouldChangeDirection = false;
        if (checkCanvasCollision(this.bounds, canvas)) {
            // Check for collisions with the canvas boundaries
            shouldChangeDirection = true;
        }
        if (Math.random() < 0.03) {
            // Randomly change the direction
            shouldChangeDirection = true;
        }
        if (shouldChangeDirection) {
            // If there's a collision or random direction change, update the direction
            this.changeDirection(canvas);
        }
        // Calculate the next position based on the updated speed
        const { nextX, nextY } = this.calculateNextPosition(deltaTime);
        // Apply the movement
        this.position = { x: nextX, y: nextY }
        this.draw(ctx)
    }

    draw(ctx) {
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height
        );
    }
}

{/************************************************************************************************* 
    
                        EXPORTS

**************************************************************************************************/}



class Zombie extends Enemy {
    constructor({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, health, ctx, attackDamage, fillColor }) {
        super({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, health, ctx, attackDamage, fillColor })
    }

    // Override or extend methods as needed for Zombie behavior
    // For example, implement AI logic to make the Zombie chase the player
}

class Skeleton extends Enemy {
    constructor({ x, y, speedX, speedY }) {
        // Set specific properties for Skeleton enemies
        super({ x, y, width: 48, height: 48, speedX, speedY, baseSpeed: 50, health: 1, attackDamage: 1, fillColor: 'grey' });
    }

    // Override or extend methods as needed for Skeleton behavior
    // For example, implement AI logic for Skeleton to use ranged attacks
}

export {
    Enemy,
    Zombie,
    Skeleton
};