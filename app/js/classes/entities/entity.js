import { checkCanvasCollision } from "../../physics/collisionDetection.js";

class Entity {
    constructor(x, y, width, height, speed, health, maxHealth, tileSize) {
        this.tileSize = tileSize;

        this.position = {
            xPosition: x,
            get x() { return this.xPosition; },
            set x(x) { this.xPosition = x; },
            yPosition: y,
            get y() { return this.yPosition; },
            set y(y) { this.yPosition = y; },
            getValue: () => { return { x: this.xPosition, y: this.yPosition } },
            setValue: ({ x, y }) => { this.xPosition = x; this.yPosition = y; }
        };

        this.speed = {
            xSpeed: speed,
            get x() { return this.xSpeed; },
            set x(x) { this.xSpeed = x; },
            ySpeed: speed,
            get y() { return this.ySpeed; },
            set y(y) { this.ySpeed = y; },
            getValue: () => { return { x: this.xSpeed, y: this.ySpeed } },
            setValue: ({ x, y }) => { this.xSpeed = x; this.ySpeed = y; }
        };

        this.dimensions = {
            entityWidth: width,
            get width() { return this.entityWidth; },
            entityHeight, height,
            get height() { return this.entityHeight; },
            getValue: () => { return { width: this.entityWidth, height: this.entityHeight } },
        };

        this.direction = {
            xDirection: 0,
            get x() { return this.xDirection; },
            set x(x) { this.xDirection = x; },
            yDirection: 1,
            get y() { return this.yDirection; },
            set y(y) { this.yDirection = y; },
            getValue: () => { return { x: this.xDirection, y: this.yDirection } },
            setValues: ({ x, y }) => { this.xDirection = x; this.yDirection = y; },
        };

        this.health = {
            entityHealth: health,
            get health() { return this.entityHealth; },
            set health(num) { this.entityHealth = num; },
            entityMaxHealth: maxHealth,
            get maxHealth() { return this.entityMaxHealth; },
            set maxHealth(num) { this.entityMaxHealth = num; },
            getValue: () => { return { health: this.entityHealth, maxHealth: this.entityMaxHealth } },
            setValue: ({ health, maxHealth }) => { this.entityHealth = health; this.entityMaxHealth = maxHealth; }
        };

        this.attack = {
            isMoving: false,
            get moving() { return this.isMoving; },
            set moving(bool) { this.isMoving = bool; },
            isAttacking: false,
            get attacking() { return this.isAttacking; },
            set attacking(bool) { this.isAttacking = bool; },
            isAttackKeyPressed: false,
            get attackKeyPressed() { return this.isAttackKeyPressed; },
            set attackKeyPressed(bool) { this.isAttackKeyPressed = bool; },
            attackDirection: {
                xDirection: 0,
                get x() { return this.xDirection; },
                set x(x) { this.xDirection = x; },

                yDirection: 1,
                get y() { return this.yDirection; },
                set y(y) { this.yDirection = y; },

                getValue: () => { return { x: this.xDirection, y: this.yDirection } },
                setValue: ({ x, y }) => { this.xDirection = x; this.yDirection = y; }
            },
            get direction() { return this.attackDirection },
            attackPoint: {
                xAttackPoint: x,
                get x() { return this.xAttackPoint; },
                set x(x) { this.xAttackPoint = x; },

                yAttackPoint: y,
                get y() { return this.yAttackPoint; },
                set y(y) { this.yAttackPoint = y; },

                getValue: () => { return { x: this.xAttackPoint, y: this.yAttackPoint } },
                setValue: ({ x, y }) => { this.xAttackPoint = x; this.yAttackPoint = y; }
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

    getEntityBounds() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.dimensions.width,
            height: this.dimensions.height
        }
    }

    update(){
        
    }
}

export default { Entity }