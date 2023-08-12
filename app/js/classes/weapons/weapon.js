export default class Weapon {
    constructor({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, attackRate, canvas }) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.weaponClass = weaponClass;
        this.type = type;
        this.name = name;
        this.icon = icon;
        this.direction = { x: 0, y: 1 };
        this.attackStartPoint = { x: 0, y: 0 };
        this.isAttack = false;
        this.attackDamage = attackDamage;
        this.staminaCost = staminaCost;
        this.durability = durability;
        this.maxDurability = durability;
        this.isAttackKeyPressed = false;
        this.lastAttack = 0;
        this.attackRate = attackRate;
        this.isBoken = false;
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

    updateCoordinates({ startPoint, direction }) {
        if (direction.x !== 0 || direction.y !== 0) {
            this.direction = direction;
        }
        this.attackStartPoint = startPoint;
    }

    isAttackReady() {
        return Date.now() - this.lastAttack > this.attackRate;
    }

    attack() {
        this.isAttackKeyPressed = true;
        this.isAttack = true;
        this.lastAttack = Date.now();
    }

    update({ startPoint, keys, direction }) {
        this.updateCoordinates({ startPoint, direction });
        if (keys["k"] && !this.isAttackKeyPressed) {
            if (this.isAttackReady()) {
                this.attack();
            }
        }
        if (!keys["k"] && this.isAttackKeyPressed) {
            this.isAttackKeyPressed = false;
        }
    }
}