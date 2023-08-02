class Projectile {
    constructor({ icon, x, y, distance, speed, type, ctx }) {
        this.icon = icon;
        this.distance = distance;
        this.position = {
            xPosiiton: x,
            yPosition: y,
            getValue() { return { x: this.xPosiiton, y: this.yPosition } },
            setValue({ x, y }) { this.xPosiiton = x; this.yPosition = y },
        };
        this.speed = speed;
        this.ctx = ctx;
    }

    update() {

    }

    draw() {
        const { x, y } = this.projectile.position
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export { Projectile }