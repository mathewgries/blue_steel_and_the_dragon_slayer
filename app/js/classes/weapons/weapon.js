export default class Weapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, attackRate, canvas }) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.type = type;
        this.name = name;
        this.icon = icon;
        this.direction = { x: 0, y: 1 }
        this.attackDamage = attackDamage;
        this.staminaCost = staminaCost;
        this.durability = durability;
        this.maxDurability = durability;
        this.lastAttack = 0;
        this.attackRate = attackRate;
        this.isBoken = false;
        this.attackStartPoint = { x: 0, y: 0 }
    }

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

    isAttackReady() {
        return Date.now() - this.lastAttack > this.attackRate;
    }

    attack({ position, dimensions }) {
        this.attackStartPoint = {
            x: position.x + dimensions.width / 2,
            y: position.y + dimensions.height / 2
        }
    }

    update() {

    }
}