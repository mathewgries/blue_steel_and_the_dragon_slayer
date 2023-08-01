class Weapon {
    constructor({name, icon, attackDamage, staminaCost, durability, maxDurability}) {
        this.name = name;
        this.icon = icon;
        this.attackDamage = attackDamage;
        this.staminaCost = staminaCost;
        this.durability = durability;
        this.maxDurability = maxDurability;
        this.isBoken = false;
    }

    attack() {

    }
}

export { Weapon }