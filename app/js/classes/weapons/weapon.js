class Weapon {
    constructor({ name, icon, attackDamage, staminaCost, durability, maxDurability, ctx }) {
        this.ctx = ctx;
        this.name = name;
        this.icon = icon;
        this.attackDamage = attackDamage;
        this.staminaCost = staminaCost;
        this.durability = durability;
        this.maxDurability = maxDurability;
        this.lastAttack = {
            timeStamp: 0,
            get time() { return this.timeStamp },
            set time(value) { this.timeStamp = value }
        }
        this.attackRate = 1000;
        this.isBoken = false;
        this.attack = {
            startAttackPosition: { x: 0, y: 0 },
            get startPosition() { return { x: this.startAttackPosition.x, y: this.startPosition.y } },
            set startPosition({ x, y }) { this.startAttackPosition.x = x; this.startAttackPosition.y = y }
        }
    }

    isAttackReady() {
        return Date.now() - this.lastAttack.time > this.attackRate;
    }

    attack() {

    }

    update() {

    }
}

export { Weapon }