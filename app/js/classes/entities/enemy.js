import { checkCanvasCollision } from "../../physics/collisionDetection.js";

{/************************************************************************************************* 
    
                        ENEMY CLASS

**************************************************************************************************/}

class Enemy {
    //*************************************************
    // INITIALIZE AND POSITIONING
    //*************************************************
    constructor({ x, y, width, height, speedX, speedY, baseSpeed, health, attackDamage, fillColor }) {
        this.position = { x, y }
        this.dimensions = { width, height }
        this.speed = { x: speedX, y: speedY }
        this.baseSpeed = baseSpeed
        this.health = health;
        this.attackDamage = attackDamage
        this.fillColor = fillColor
        this.hasBeenHit = false;
        this.hasBeenHitDuration = 100;
    }

    setPosiition({ x, y }) { this.position = { x, y } }
    getPosition() { return this.position }
    getDimensions() { return this.dimensions }
    setSpeed({ x, y }) { this.speed = { x, y } }
    getSpeed() { return this.speed }
    setHealth(num) { this.health = num }
    getHealth() { return this.health }
    getAttackDamage() { return this.attackDamage }
    setHasBeenHit(bool) { this.hasBeenHit = bool }
    getHasBeenHit() { return this.hasBeenHit }
    getHasBeenHitDuration() { return this.hasBeenHitDuration }

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

    takeDamage(damage) {
        if (!this.getHasBeenHit()) {
            this.setHealth(this.getHealth() - damage)
            this.setHasBeenHit(true)

            setTimeout(() => {
                this.setHasBeenHit(false)
            }, this.getHasBeenHitDuration())
        }
    }

    //*************************************************
    // UPDATE AND DRAW
    //*************************************************

    updatePosition(deltaTime, ctx, canvas) {
        let shouldChangeDirection = false;
        if (checkCanvasCollision(this, canvas)) {
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
        ctx.fillStyle = this.fillColor;
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



class Zombie extends Enemy {
    constructor({ x, y, speedX, speedY }) {
        // Set specific properties for Zombie enemies
        super({ x, y, width: 48, height: 48, speedX, speedY, baseSpeed: 50, health: 2, attackDamage: 2, fillColor: 'green' });
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