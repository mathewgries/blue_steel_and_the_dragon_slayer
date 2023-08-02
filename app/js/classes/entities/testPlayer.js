import { Entity } from "./entity.js";
import { Inventory } from "../inventory/inventory.js";
import { checkCanvasCollision } from "../../physics/collisionDetection.js";

class Player extends Entity {
    constructor({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, health, attackDamage, ctx }) {
        super({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, health, attackDamage, ctx })
        this.playerIsMoving = false;

        this.attack = {
            keyDepressed: false,
            get isDepressed() { return this.keyDepressed; },
            set isDepressed(bool) { this.keyDepressed = bool; },
            attackPoint: {
                xPoint: xPosition,
                get x() { return this.xPoint },
                yPoint: yPosition,
                get y() { return this.yPoint },
                getValue() { return { x: this.xPoint, y: this.yPoint } },
                setValue({ x, y }) { this.xPoint = x; this.yPoint = y; }
            },
            get point() { return this.attackPoint },
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
            set direction({ x, y }) { this.knockbackDirection.xDirection = x, this.knockbackDirection.yDirection = y },
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

        this.inventory = new Inventory(this.ctx);
        this.inventory.equippedWeapon.attack.direction = this.direction
    }

    get isMoving(){return this.playerIsMoving}
    set isMoving(bool){return this.playerIsMoving = bool}

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

        // Update player position based on direction and speed
        this.position = {
            x: this.position.x + this.direction.x * playerMovement,
            y: this.position.y + this.direction.y * playerMovement,
        };

        this.isMoving = (this.direction.x !== 0 || this.direction.y !== 0);
        if (this.isMoving) {
            this.inventory.equippedWeapon.attack.direction = this.direction
        }
    }

    knockbackLoop() {
        if (this.knockback.frame < this.knockback.maxFrames) {
            // Update the player's position incrementally based on knockback direction and speed
            this.position = {
                x: this.position.x + this.knockback.direction.x * this.knockback.speed,
                y: this.position.y + this.knockback.direction.y * this.knockback.speed,
            };
            this.inventory.equippedWeapon.attack.direction = this.direction
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

    startAttack() {
        if (!this.inventory.equippedWeapon.isAttackReady()) {
            return;
        } else {
            this.attack.isDepressed = true;
            this.inventory.equippedWeapon.lastAttack.time = Date.now();
            this.inventory.equippedWeapon.attack()
        }
    }

    attackEnemy(enemy) {
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
        const centerEnemyX = enemy.position.x + enemy.dimensions.width / 2;
        const centerEnemyY = enemy.position.y + enemy.dimensions.height / 2;

        const deltaX = centerPlayerX - centerEnemyX;
        const deltaY = centerPlayerY - centerEnemyY;

        this.knockback.direction = {
            x: deltaX > 0 ? 1 : -1,
            y: deltaY > 0 ? 1 : -1
        };

        // Apply the knockback effect to the player
        this.startKnockback();
    }

    takeDamage(entity) {
        super.takeDamage(entity)
        this.handleCollisionWithEnemy(entity)
        if (this.health <= 0) {
            // Handle player defeated
        }
    }

    //***********************************************************************
    //                          UPDATE AND DRAW
    //***********************************************************************

    update(keys, deltaTime, canvas) {
        const playerMovement = this.baseSpeed * deltaTime;
        // DISABLE KEY MOVE IF KNOCKBACK IS RUNNING
        if (!this.knockback.isActive) {
            this.handleNormalMovement(keys, playerMovement)
        }

        this.inventory.update()
        // HANDLE ATTACK KEY PRESS
        if (this.inventory.equipWeapon) {
            if (keys["k"] && !this.attack.isDepressed) {
                this.startAttack()
            }
        }
        if (!keys["k"] && this.attack.isDepressed) {
            this.attack.isDepressed = false;
        }

        if (checkCanvasCollision(this.bounds, canvas)) {
            this.position = {
                x: Math.max(0, Math.min(this.position.x, canvas.width - this.dimensions.width)),
                y: Math.max(0, Math.min(this.position.y, canvas.height - this.dimensions.height))
            }
        }

        this.draw()
    }

    draw() {
        this.ctx.fillStyle = 'blue'; // Draw the player on the canvas
        this.ctx.fillRect(
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