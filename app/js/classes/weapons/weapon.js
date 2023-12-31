import { updateDurabilityMeter } from './updateUi.js';

export default class Weapon {
    constructor({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, canvas }) {
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
        this.durabilityRate = durabilityRate;
        this.maxDurability = durability;
        this.isAttackKeyPressed = false;
        this.lastAttack = 0;
        this.attackRate = attackRate;
        this.isBroken = false;
    }

    normalizeDirectionVector({ x, y }) {
        let xDirection = x;
        let yDirection = y;
        const length = Math.sqrt(x * x + y * y);
        if (length !== 0) {
            xDirection /= length;
            yDirection /= length;
        }
        return { x: xDirection, y: yDirection };
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
        this.updateDurability();
    }

    updateDurability() {
        this.durability -= this.durabilityRate;
        const percentage = (this.durability / this.maxDurability) * 100;
        updateDurabilityMeter({ percentage, weaponType: this.type });
        if (percentage <= 0) {
            this.isBroken = true;
        }
    }

    update({ startPoint, keys, direction, stamina }) {
        this.updateCoordinates({ startPoint, direction });
        if (keys["k"] && !this.isAttackKeyPressed) {
            if (this.isAttackReady() && !this.isBroken && this.durability > 0 && stamina) {
                this.attack();
            }
        }
        if (!keys["k"] && this.isAttackKeyPressed) {
            this.isAttackKeyPressed = false;
        }
    }
}