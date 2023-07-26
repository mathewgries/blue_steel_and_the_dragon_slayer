import { checkCanvasCollision } from "./collisionDetection.js";

class Player {

    //*************************************************
    // INITIALIZE AND POSITIONING
    //*************************************************

    constructor(x, y, width, height, speed, health, maxHealth, tileSize) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speed;
        this.speedY = speed;
        this.xDirection = 0;
        this.yDirection = 0;
        this.baseSpeed = speed;
        this.tileSize = tileSize
        this.health = health;
        this.maxHealth = maxHealth;

        this.isMoving = false;
        this.isAttacking = false;
        this.attackPoint = { x: this.x, y: this.y }
        this.attackDamage = 1;
        this.attackRange = tileSize / 2 + tileSize;
        this.attackCooldownTime = 100;

        this.knockbackCooldownTime = 500;
        this.knockbackCooldownActive = false;
        this.knockbackActive = false;
        this.knockbackDirectionX = 0;
        this.knockbackDirectionY = 0;
        this.knockbackSpeed = 5;
        this.knockbackDistance = 5;
        this.knockbackDuration = 10;
        this.knockbackFrame = 0;
    }

    getBoundingBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }

    //*************************************************
    // MOVEMENT AND DIRECTION
    //*************************************************

    setMovementDirection(keys, playerMovement) {
        this.xDirection = 0;
        this.yDirection = 0;

        if (keys['w']) {
            this.yDirection -= 1; // Move up
        }
        if (keys['s']) {
            this.yDirection += 1; // Move down
        }
        if (keys['a']) {
            this.xDirection -= 1; // Move left
        }
        if (keys['d']) {
            this.xDirection += 1; // Move right
        }

        // Normalize the direction vector (to ensure diagonal movement is not faster)
        const length = Math.sqrt(this.xDirection * this.xDirection + this.yDirection * this.yDirection);
        if (length !== 0) {
            this.xDirection /= length;
            this.yDirection /= length;
        }

        // Update player position based on direction and speed
        this.x += this.xDirection * playerMovement;
        this.y += this.yDirection * playerMovement;

        this.isMoving = this.xDirection !== 0 || this.yDirection !== 0;
    }

    knockback(directionX, directionY) {
        if (this.knockbackActive) {
            return; // Prevent overlapping knockbacks
        }

        this.knockbackActive = true;
        this.knockbackDirectionX = directionX;
        this.knockbackDirectionY = directionY;

        // Start the knockback loop
        this.knockbackFrame = 0;
        this.knockbackLoop();
    }



    knockbackLoop() {
        if (this.knockbackFrame < this.knockbackDuration) {
            // Update the player's position incrementally based on knockback direction and speed
            this.x += this.knockbackDirectionX * this.knockbackSpeed;
            this.y += this.knockbackDirectionY * this.knockbackSpeed;

            this.updateAttackPoint()
            // Increment the frame counter
            this.knockbackFrame++;

            // Request the next frame
            requestAnimationFrame(this.knockbackLoop.bind(this));
        } else {
            // Knockback loop finished
            this.knockbackActive = false;
        }
    }

    startKnockbackCooldown() {
        this.knockbackCooldownActive = true;

        // Set a timer to reset the cooldown after the specified time (this.cooldownTime)
        setTimeout(() => {
            this.knockbackCooldownActive = false;
        }, this.knockbackCooldownTime);
    }

    //*************************************************
    // ATTACKING
    //*************************************************

    getIsAttacking() {
        return this.isAttacking
    }

    setIsAttacking() {
        if (this.isAttacking) {
            return;
        }
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, this.attackCooldownTime);
    }

    updateAttackPoint() {
        this.attackPoint.x = this.x + this.width / 2 + this.xDirection * this.attackRange;
        this.attackPoint.y = this.y + this.height / 2 + this.yDirection * this.attackRange;
    }

    attack(enemy, ctx) {
        // TESTING
        ctx.beginPath();
        ctx.arc(this.attackPoint.x, this.attackPoint.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        // Check if the attack point collides with the enemy's bounding box
        if (
            this.attackPoint.x >= enemy.x &&
            this.attackPoint.x <= enemy.x + enemy.width &&
            this.attackPoint.y >= enemy.y &&
            this.attackPoint.y <= enemy.y + enemy.height
        ) {
            // Enemy is within attack range, apply the attack logic here
            enemy.takeDamage(this.attackDamage);
        }
    }

    //*************************************************
    // HEALTH AND DAMAGE
    //*************************************************

    handleCollisionWithEnemy(enemy) {
        if (this.knockbackCooldownActive) {
            return;
        }

        const enemyBoundingBox = enemy.getBoundingBox();

        // Calculate the direction of the knockback effect based on the player's position and the enemy's position
        const centerPlayerX = this.x + this.width / 2;
        const centerPlayerY = this.y + this.height / 2;
        const centerEnemyX = enemyBoundingBox.x + enemyBoundingBox.width / 2;
        const centerEnemyY = enemyBoundingBox.y + enemyBoundingBox.height / 2;

        const deltaX = centerPlayerX - centerEnemyX;
        const deltaY = centerPlayerY - centerEnemyY;

        const knockbackDirectionX = deltaX > 0 ? 1 : -1;
        const knockbackDirectionY = deltaY > 0 ? 1 : -1;

        // Apply the knockback effect to the player
        this.knockback(knockbackDirectionX, knockbackDirectionY);

        this.takeDamage(enemy.getAttackDamage());
        this.startKnockbackCooldown();
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            // Handle player defeated
        }
    }

    increaseMaxHealth(increaseAmount) {
        this.maxHealth += increaseAmount;
    }

    //*************************************************
    // UPDATE AND DRAW
    //*************************************************

    updatePlayer(keys, ctx, canvas, deltaTime) {
        const playerMovement = this.baseSpeed * deltaTime;
        this.setMovementDirection(keys, playerMovement)

        if (this.isMoving) {
            this.updateAttackPoint();
        }

        if (keys['k'] && !this.isAttacking) {
            this.setIsAttacking()
        }

        const playerBox = this.getBoundingBox();
        // Handle collision detection
        if (checkCanvasCollision(playerBox, canvas)) {
            this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));
            this.y = Math.max(0, Math.min(this.y, canvas.height - this.height));
        }

        this.draw(ctx)
    }

    draw(ctx) {
        ctx.fillStyle = 'blue'; // Draw the player on the canvas
        ctx.fillRect(this.x, this.y, this.width, this.height); // For simplicity, we'll use a blue square for the player

        // TESTING
        // Calculate the center of the player rectangle
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        // Set the color and size of the direction indicator dot
        ctx.fillStyle = 'red';
        const dotSize = 5;

        // CAN PROBABLY USE THIS FOR THE SPRITE
        // Draw the direction indicator dot based on the player's current direction
        if (this.xDirection > 0) {
            // Facing right
            ctx.fillRect(centerX, centerY - dotSize / 2, dotSize, dotSize);
        } else if (this.xDirection < 0) {
            // Facing left
            ctx.fillRect(centerX - dotSize, centerY - dotSize / 2, dotSize, dotSize);
        } else if (this.yDirection > 0) {
            // Facing down
            ctx.fillRect(centerX - dotSize / 2, centerY, dotSize, dotSize);
        } else if (this.yDirection < 0) {
            // Facing up
            ctx.fillRect(centerX - dotSize / 2, centerY - dotSize, dotSize, dotSize);
        }

        // ctx.beginPath();
        // ctx.arc(this.attackPoint.x, this.attackPoint.y, 2, 0, Math.PI * 2);
        // ctx.fillStyle = 'red';
        // ctx.fill();
        // ctx.closePath();
    }
}

{/************************************************************************************************ 

                            EXPORTS

**************************************************************************************************/}

// Export the function so it can be used in the main game.js file
export { Player };
