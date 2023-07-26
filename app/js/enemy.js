{/************************************************************************************************* 
    
                        IMPORTS

**************************************************************************************************/}

import { checkCanvasCollision } from "./collisionDetection.js";

{/************************************************************************************************* 
    
                        ENEMY CLASS

**************************************************************************************************/}

class Enemy {

    //*************************************************
    // INITIALIZE AND POSITIONING
    //*************************************************

    constructor(x, y, width, height, speedX, speedY, baseSpeed, health, attackDamage) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.baseSpeed = baseSpeed;
        this.health = health;
        this.attackDamage = attackDamage
    }

    getBoundingBox() {
        // Return the entities bounding box as an object
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }

    // Function to calculate the next position without applying it directly
    calculateNextPosition(deltaTime) {
        const nextX = this.x + this.speedX * deltaTime;
        const nextY = this.y + this.speedY * deltaTime;
        return { nextX, nextY };
    }

    changeDirection(canvas) {
        let randomDirection = Math.random() < 0.5 ? 1 : -1;
        const isMovingHorizontal = this.speedY === 0 ? true : false
        const atTopEdge = this.y <= 0;
        const atBottomEdge = this.y + this.height >= canvas.height;
        const atLeftEdge = this.x <= 0;
        const atRightEdge = this.x + this.width >= canvas.width;

        if (isMovingHorizontal) {
            if (randomDirection < 0 && atTopEdge || randomDirection > 0 && atBottomEdge) {
                randomDirection *= -1
            }
            this.speedY = randomDirection * this.baseSpeed;
            this.speedX = 0
        } else {
            if (randomDirection < 0 && atLeftEdge || randomDirection > 0 && atRightEdge) {
                randomDirection *= -1
            }
            this.speedX = randomDirection * this.baseSpeed;
            this.speedY = 0
        }
    }

    //*************************************************
    // HEALTH AND DAMAGE
    //*************************************************

    getAttackDamage() {
        return this.attackDamage
    }

    takeDamage(amount){
        this.health -= amount
    }

    //*************************************************
    // UPDATE AND DRAW
    //*************************************************

    updatePosition(deltaTime, ctx, canvas) {
        let shouldChangeDirection = false;
        if (checkCanvasCollision(this.getBoundingBox(), canvas)) {
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
        this.x = nextX;
        this.y = nextY;

        this.draw(ctx)
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

{/************************************************************************************************* 
    
                        EXPORTS

**************************************************************************************************/}

export { Enemy };
