import { checkCanvasCollision } from "./collisionDetection.js";

{/************************************************************************************************* 
    
                        ENEMY CLASS

**************************************************************************************************/}

class Enemy {
    //*************************************************
    // INITIALIZE AND POSITIONING
    //*************************************************
    constructor(x, y, width, height, speedX, speedY, baseSpeed, health, attackDamage) {
        this.position = { x, y }
        this.dimensions = { width, height }
        this.speed = { x: speedX, y: speedY }
        this.baseSpeed = baseSpeed
        this.health = health;
        this.attackDamage = attackDamage
        // this.x = x;
        // this.y = y;
        // this.width = width;
        // this.height = height;
        // this.speedX = speedX;
        // this.speedY = speedY;
    }

    setPosiition({ x, y }) { this.position = { x, y } }
    getPosition() { return this.position }
    getDimensions() { return this.dimensions }
    setSpeed({ x, y }) { this.speed = { x, y } }
    getSpeed() { return this.speed }
    setHealth(num) { this.health = num }
    getHealth() { return this.health }
    getAttackDamage() { return this.attackDamage }

    getBoundingBox() {
        // Return the entities bounding box as an object
        return {
            x: this.getPosition().x,
            y: this.getPosition().y,
            width: this.getDimensions().width,
            height: this.getDimensions().height,
        };
    }

    // Function to calculate the next position without applying it directly
    calculateNextPosition(deltaTime) {
        const nextX = this.getPosition().x + this.getSpeed().x * deltaTime;
        const nextY = this.getPosition().y + this.getSpeed().y * deltaTime;
        return { nextX, nextY };
    }

    changeDirection(canvas) {
        let randomDirection = Math.random() < 0.5 ? 1 : -1;
        const isMovingHorizontal = this.getSpeed().y === 0 ? true : false
        const atTopEdge = this.getPosition().y <= 0;
        const atBottomEdge = this.getPosition().y + this.getDimensions().height >= canvas.height;
        const atLeftEdge = this.getPosition().x <= 0;
        const atRightEdge = this.getPosition().x + this.getDimensions().width >= canvas.width;

        if (isMovingHorizontal) {
            if (randomDirection < 0 && atTopEdge || randomDirection > 0 && atBottomEdge) {
                randomDirection *= -1
            }
            this.setSpeed({ x: 0, y: randomDirection * this.baseSpeed })
        } else {
            if (randomDirection < 0 && atLeftEdge || randomDirection > 0 && atRightEdge) {
                randomDirection *= -1
            }
            this.setSpeed({ x: randomDirection * this.baseSpeed, y: 0 })
        }
    }

    //*************************************************
    // HEALTH AND DAMAGE
    //*************************************************

    takeDamage(amount) {
        this.setHealth(this.getHealth() - amount)
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
        this.setPosiition({ x: nextX, y: nextY })
        this.draw(ctx)
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.getPosition().x,
            this.getPosition().y,
            this.getDimensions().width,
            this.getDimensions().height
        );
    }
}

{/************************************************************************************************* 
    
                        EXPORTS

**************************************************************************************************/}

export { Enemy };
