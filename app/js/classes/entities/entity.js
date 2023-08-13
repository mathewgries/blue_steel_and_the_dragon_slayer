import { checkCanvasCollision } from "../../physics/collisionDetection.js";

export default class Entity {
    constructor({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, canvas }) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.baseDimensions = { width: baseWidth, height: baseHeight };
        this.baseSpeed = speed;
        this.position = { x: xPosition, y: yPosition };
        this.speed = { x: xSpeed, y: ySpeed };
        this.direction = { x: 0, y: 1 };
        this.dimensions = { width: baseWidth, height: baseHeight };
        this.attackDamage = attackDamage;
        this.health = health || null;;
        this.maxHealth = health || null;
        this.knockback = {
            isActive: false,
            direction: { x: 0, y: 0 },
            speed: 3,
            duration: 120,
            frame: 0,
            maxFrames: 5,
        };
    }

    normalizeDirectionVector(xDirection, yDirection) {
        let x = xDirection;
        let y = yDirection;
        const length = Math.sqrt(x * x + y * y);
        if (length !== 0) {
            x /= length;
            y /= length;
        }
        return { x, y };
    }

    get bounds() {
        return {
            left: this.position.x,
            right: this.position.x + this.dimensions.width,
            top: this.position.y,
            bottom: this.position.y + this.dimensions.height,
        };
    }

    knockbackLoop() {
        if (this.knockback.frame < this.knockback.maxFrames) {
            this.position = {
                x: this.position.x + this.knockback.direction.x * this.knockback.speed,
                y: this.position.y + this.knockback.direction.y * this.knockback.speed,
            };
            this.knockback.frame = this.knockback.frame + 1;
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
        }, this.knockback.duration);
    }

    handleCollisionWithEntity(entity) {
        if (this.knockback.isActive) { return; }
        const thisX = this.position.x + this.dimensions.width / 2;
        const thisY = this.position.y + this.dimensions.height / 2;
        const entityX = entity.position.x + entity.dimensions.width / 2;
        const entityY = entity.position.y + entity.dimensions.height / 2;
        const deltaX = thisX - entityX;
        const deltaY = thisY - entityY;

        this.knockback.direction = this.normalizeDirectionVector(deltaX, deltaY);
        this.startKnockback();
    }

    handleCollisionWithWeapon(weapon) {
        if (this.knockback.isActive) { return; }
        const thisX = this.position.x + this.dimensions.width / 2;
        const thisY = this.position.y + this.dimensions.height / 2;
        const weaponX = weapon.attackPoint.x;
        const weaponY = weapon.attackPoint.y;
        const deltaX = thisX - weaponX;
        const deltaY = thisY - weaponY;

        this.knockback.direction = this.normalizeDirectionVector(deltaX, deltaY);
        this.startKnockback();
    }

    handleCollisionWithCanvasBounds() {
        if (checkCanvasCollision(this.bounds, this.canvas)) {
            this.position = {
                x: Math.max(0, Math.min(this.position.x, this.canvas.baseDimensions.width - this.dimensions.width)),
                y: Math.max(0, Math.min(this.position.y, this.canvas.baseDimensions.height - this.dimensions.height))
            };
        }
    }

    takeDamage(entity) {
        this.health = this.health - entity.attackDamage
        if (this.health <= 0) {
            // Handle player defeated
        }
    }

    update() {
        this.handleCollisionWithCanvasBounds();
    }
}