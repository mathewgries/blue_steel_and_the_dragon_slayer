import { checkCanvasCollision } from "../../physics/collisionDetection.js";
import { Inventory } from "../inventory/inventory.js";

class Player {
    constructor(x, y, width, height, speed, health, maxHealth, tileSize) {
        this.tileSize = tileSize;
        this.speed = speed;
        this.position = {
            xPosition: x,
            get x() { return this.xPosition; },
            set x(x) { this.xPosition = x; },
            yPosition: y,
            get y() { return this.yPosition; },
            set y(y) { this.yPosition = y; },
            getValue() { return { x: this.xPosition, y: this.yPosition } },
            setValue({ x, y }) { this.xPosition = x; this.yPosition = y; }
        };

        this.dimensions = {
            playerWidth: width,
            get width() { return this.playerWidth; },
            playerHeight: height,
            get height() { return this.playerHeight; },
            getValue() { return { width: this.playerWidth, height: this.playerHeight } },
        };

        this.direction = {
            xDirection: 0,
            get x() { return this.xDirection; },
            set x(x) { this.xDirection = x; },
            yDirection: 1,
            get y() { return this.yDirection; },
            set y(y) { this.yDirection = y; },
            getValue() { return { x: this.xDirection, y: this.yDirection } },
            setValue({ x, y }) { this.xDirection = x; this.yDirection = y },

        };

        this.health = {
            entityHealth: health,
            get value() { return this.entityHealth; },
            set value(num) { this.entityHealth = num; },
            entityMaxHealth: maxHealth,
            get maxHealth() { return this.entityMaxHealth; },
            set maxHealth(num) { this.entityMaxHealth = num; },
            getValue() { return { health: this.entityHealth, maxHealth: this.entityMaxHealth } },
            setValue({ health, maxHealth }) { this.entityHealth = health; this.entityMaxHealth = maxHealth; }
        };

        this.attack = {
            isMoving: false,
            get moving() { return this.isMoving; },
            set moving(bool) { this.isMoving = bool; },
            attacking: false,
            get isActive() { return this.attacking; },
            set isActive(bool) { this.attacking = bool; },
            keyPressed: false,
            get isKeyPressed() { return this.keyPressed; },
            set isKeyPressed(bool) { this.keyPressed = bool; },
            attackDirection: {
                xDirection: 0,
                get x() { return this.xDirection; },
                set x(x) { this.xDirection = x; },

                yDirection: 1,
                get y() { return this.yDirection; },
                set y(y) { this.yDirection = y; },

                getValue() { return { x: this.xDirection, y: this.yDirection } },
                setValue({ x, y }) { this.xDirection = x; this.yDirection = y; }
            },
            get direction() { return this.attackDirection },
            attackPoint: {
                xPoint: x,
                get x() { return this.xPoint; },
                set x(x) { this.xPoint = x; },

                yPoint: y,
                get y() { return this.yPoint; },
                set y(y) { this.yPoint = y; },

                getValue() { return { x: this.xPoint, y: this.yPoint } },
                setValue({ x, y }) { this.xPoint = x; this.yPoint = y; }
            },
            get point() { return this.attackPoint },
            attackDamage: 1,
            get damage() { return this.attackDamage; },
            set damage(num) { this.attackDamage = num; },
            attackRange: tileSize / 2 + tileSize,
            get range() { return this.attackRange; },
            set range(num) { this.attackRange = num; },
            attackDuration: 100,
            get duration() { return this.attackDuration }
        };

        this.knockback = {
            isKncokBackActive: false,
            get isActive() { return this.isKncokBackActive },
            set isActive(bool) { this.isKncokBackActive = bool },
            knockbackDirection: {
                xDirection: 0,
                get x() { return this.xDirection },
                set x(x) { this.xDirection = x },

                yDirection: 0,
                get y() { return this.yDirection },
                set y(y) { this.yDirection = y },

                getValue() { return { x: this.xDirection, y: this.yDirection } },
                setValue({ x, y }) { this.xDirection = x; this.yDirection = y; },
            },
            get direction() { return this.knockbackDirection },
            knockbackSpeed: 5,
            get speed() { return this.knockbackSpeed },
            knockbackDistance: 5,
            get distance() { return this.knockbackDistance },
            knockbackDuration: 250,
            get duration() { return this.knockbackDuration },
            knockbackFrame: 0,
            get frame() { return this.knockbackFrame },
            set frame(num) { this.knockbackFrame = num },
            knockbackMaxFrames: 10,
            get maxFrames() { return this.knockbackMaxFrames }
        };

        this.inventory = new Inventory();

        this.updateAttack(this.attack.direction.x, this.attack.direction.y)
    }

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

    handleNormalMovement(keys, playerMovement) {
        this.direction.setValue({ x: 0, y: 0 });

        if (keys['w']) {
            this.direction.setValue({ x: this.direction.x, y: this.direction.y - 1 });
        }
        if (keys['s']) {
            this.direction.setValue({ x: this.direction.x, y: this.direction.y + 1 });
        }
        if (keys['a']) {
            this.direction.setValue({ x: this.direction.x - 1, y: this.direction.y });
        }
        if (keys['d']) {
            this.direction.setValue({ x: this.direction.x + 1, y: this.direction.y });
        }

        const direction = this.normalizeDirectionVector(this.direction.x, this.direction.y);
        this.direction.setValue({ x: direction.x, y: direction.y })

        // Update player position based on direction and speed
        this.position.setValue({
            x: this.position.x + this.direction.x * playerMovement,
            y: this.position.y + this.direction.y * playerMovement,
        });

        this.attack.moving = (this.direction.x !== 0 || this.direction.y !== 0);
        if (this.attack.moving) {
            this.updateAttack(this.direction.x, this.direction.y)
        }
    }

    knockbackLoop() {
        if (this.knockback.frame < this.knockback.maxFrames) {
            // Update the player's position incrementally based on knockback direction and speed
            this.position.setValue({
                x: this.position.x + this.knockback.direction.x * this.knockback.speed,
                y: this.position.y + this.knockback.direction.y * this.knockback.speed,
            });
            this.updateAttack(this.attack.direction.x, this.attack.direction.y)
            // Increment the frame counter
            this.knockback.frame = this.knockback.frame + 1;
            // Request the next frame
            requestAnimationFrame(this.knockbackLoop.bind(this));
        }
    }

    startKnockback() {
        if (this.knockback.isActive) {
            return;
        }

        this.knockback.isActive = true;
        this.knockback.frame = 0;
        this.knockbackLoop();

        setTimeout(() => {
            this.knockback.isActive = false;
        }, this.knockback.duration)
    }

    //***********************************************************************
    //                             ATTACKING
    //***********************************************************************

    updateAttack(xDirection, yDirection) {
        const direction = this.normalizeDirectionVector(xDirection, yDirection)
        this.attack.direction.setValue({ x: direction.x, y: direction.y })
        this.attack.point.setValue({
            x: this.position.x + this.dimensions.width / 2 + this.attack.direction.x * this.attack.range,
            y: this.position.y + this.dimensions.height / 2 + this.attack.direction.y * this.attack.range
        })
    }

    startAttack() {
        if (this.attack.isActive) {
            return;
        }
        this.attack.isActive = true;
        setTimeout(() => {
            this.attack.isActive = false;
        }, this.attack.duration);
    }

    attackEnemy(enemy, ctx) {
        // Check if the attack point collides with the enemy's bounding box
        if (
            this.attack.point.x >= enemy.getPosition().x &&
            this.attack.point.x <= enemy.getPosition().x + enemy.getDimensions().width &&
            this.attack.point.y >= enemy.getPosition().y &&
            this.attack.point.y <= enemy.getPosition().y + enemy.getDimensions().height
        ) {
            // Enemy is within attack range, apply the attack logic here
            enemy.takeDamage(this.attack.damage);
        }
    }

    //***********************************************************************
    //                          HEALTH AND DAMAGE
    //***********************************************************************

    handleCollisionWithEnemy(enemy) {
        if (this.knockback.isActive) {
            return;
        }

        // Calculate the direction of the knockback effect based on the player's position and the enemy's position
        const centerPlayerX = this.position.x + this.dimensions.width / 2;
        const centerPlayerY = this.position.y + this.dimensions.height / 2;
        const centerEnemyX = enemy.getPosition().x + enemy.getDimensions().width / 2;
        const centerEnemyY = enemy.getPosition().y + enemy.getDimensions().height / 2;

        const deltaX = centerPlayerX - centerEnemyX;
        const deltaY = centerPlayerY - centerEnemyY;

        this.knockback.direction = {
            x: deltaX > 0 ? 1 : -1,
            y: deltaY > 0 ? 1 : -1
        };

        // Apply the knockback effect to the player
        this.startKnockback();
        this.takeDamage(enemy.getAttackDamage());
    }

    takeDamage(damage) {
        const newValue = this.health.value - damage
        this.health.value = newValue
        if (this.health.value <= 0) {
            // Handle player defeated
        }
    }

    //***********************************************************************
    //                          UPDATE AND DRAW
    //***********************************************************************

    updatePlayer(keys, ctx, canvas, deltaTime) {
        const playerMovement = this.speed * deltaTime;
        if (!this.knockback.isActive) {
            this.handleNormalMovement(keys, playerMovement)
        }

        if (keys["k"] && !this.attack.isActive && !this.attack.isKeyPressed) {
            this.startAttack();
            this.attack.isKeyPressed = true; // Set the flag to true when "k" is pressed
        }

        if (!keys["k"]) {
            this.attack.isKeyPressed = false;
        }

        // console.log(this.inventory)

        this.draw(ctx)
    }

    draw(ctx) {
        ctx.fillStyle = 'blue'; // Draw the player on the canvas
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height
        );
    }
}

{/************************************************************************************************ 
                                        EXPORTS
**************************************************************************************************/}

export { Player };