import Entity from "../entities/entity.js"

class Projectile extends Entity {
    constructor({ xPosition, yPosition, direction, baseWidth, baseHeight, xSpeed, ySpeed, speed, attackDamage, icon, type, canvas }) {
        super({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, attackDamage, type, canvas })
        this.icon = new Image();
        this.icon.src = `../../assets/images/projectiles/${icon}`;
        this.distance = 0;
        this.direction = direction
        this.toBeRemoved = false;
        this.speed = { x: 2, y: 2 }
    }

    moveProjectile(deltaTime) {
        const projectileMovement = this.baseSpeed * deltaTime;
        this.position = {
            x: this.position.x + this.direction.x * projectileMovement,
            y: this.position.y + this.direction.y * projectileMovement
        }
        this.distance += this.speed.x
    }

    update(deltaTime) {
        this.moveProjectile(deltaTime)
        this.draw()
    }

    draw() {
        this.ctx.drawImage(
            this.icon,
            this.position.x,
            this.position.y,
            this.icon.width,
            this.icon.height
        )
    }
}

export { Projectile }