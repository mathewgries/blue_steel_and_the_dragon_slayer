class Weapon {
    // #region Constructor
    constructor({ name, type, icon, attackDamage, staminaCost, durability, canvas }) {
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
        this.attackRate = 300;
        this.isBoken = false;
        this.attackStartPoint = { x: 0, y: 0 }
    }

    // #endregion

    isAttackReady() {
        return Date.now() - this.lastAttack > this.attackRate;
    }

    attack({ position }) {
        this.attackStartPoint = position
    }

    update() {

    }
}

export { Weapon }