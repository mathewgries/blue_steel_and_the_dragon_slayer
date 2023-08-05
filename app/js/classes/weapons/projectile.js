import Entity from "../entities/entity.js"

class Projectile extends Entity {
    constructor({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, attackDamage, icon, distance, type, ctx }) {
        super({ xPosition, yPosition, width, height, xSpeed, ySpeed, speed, attackDamage, ctx })
        this.icon = icon;
        this.distance = distance;
    }

    update() {
        this.draw()
    }

    draw() {
        const { x, y } = this.position
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export { Projectile }