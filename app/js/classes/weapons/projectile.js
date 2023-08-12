import Entity from '../entities/entity.js';
import { checkCanvasCollision } from '../../physics/collisionDetection.js';
import { directionToAngle } from './helpers.js';

export default class Projectile extends Entity {
    constructor({ xPosition, yPosition, direction, range, baseWidth, baseHeight, xSpeed, ySpeed, speed, attackDamage, icon, type, canvas }) {
        super({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, attackDamage, type, canvas })
        this.icon = new Image();
        this.icon.src = `../../assets/images/projectiles/${icon}`;
        this.distance = 0;
        this.direction = direction;
        this.toBeRemoved = false;
        this.range = range;
    }

    moveProjectile({ deltaTime }) {
        const projectileMovement = this.baseSpeed * deltaTime;
        this.position = {
            x: this.position.x + this.direction.x * projectileMovement,
            y: this.position.y + this.direction.y * projectileMovement
        };
        this.distance += projectileMovement;
    }

    handleCollisionWithCanvasBounds() {
        if (checkCanvasCollision(this.bounds, this.canvas)) {
            this.toBeRemoved = true;
        }
    }

    checkDistance() {
        if (this.distance >= this.range) {
            this.toBeRemoved = true;
        }
    }

    update({ deltaTime }) {
        this.moveProjectile({ deltaTime });
        this.checkDistance();
        this.handleCollisionWithCanvasBounds();
        this.draw();
    }

    draw() {
        const directionKey = `${this.direction.x.toFixed(3)},${this.direction.y.toFixed(3)}`;
        const angle = directionToAngle[directionKey] || 0;
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate((angle * Math.PI) / 180);
        this.ctx.drawImage(
            this.icon,
            -this.dimensions.width / 2,
            -this.dimensions.height / 2,
            this.dimensions.width,
            this.dimensions.height
        );
        this.ctx.restore();
    }
}

export { Projectile };