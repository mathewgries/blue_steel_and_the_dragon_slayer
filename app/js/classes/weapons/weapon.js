class Weapon {
    // #region Constructor
    constructor({ name, icon, attackDamage, staminaCost, durability, ctx }) {
        this.weaponCtx = ctx;
        this.weaponName = name;
        this.wepaonIcon = icon;
        this.weaponAttackDamage = attackDamage;
        this.weaponStaminaCost = staminaCost;
        this.weaponDurability = durability;
        this.weaponMaxDurability = durability;
        this.weaponLastAttack = 0;
        this.weaponAttackRate = 1000;
        this.weaponIsBoken = false;
        this.weaponAttackStartPoint = { x: 0, y: 0 }
    }

    // #endregion

    // #region Setters and Getters

    get ctx() { 
        return this.weaponCtx 
    }

    get name() { 
        return this.weaponName 
    }

    get icon() { 
        return this.wepaonIcon 
    }

    get attackDamage() { 
        return this.weaponAttackDamage 
    }

    get staminaCost() { 
        return this.weaponStaminaCost 
    }

    get durability() { 
        return this.weaponDurability 
    }

    get maxDurability() { 
        return this.weaponMaxDurability 
    }

    get lastAttack() { 
        return this.weaponLastAttack 
    }

    set lastAttack(date) { 
        this.weaponLastAttack = date 
    }

    get attackRate() { 
        return this.weaponAttackRate 
    }

    get isBoken() { 
        return this.weaponIsBoken 
    }

    set isBoken(bool) { 
        this.weaponIsBoken = bool 
    }

    get attackStartPoint() { 
        return this.weaponAttackStartPoint 
    }

    set attackStartPoint({ x, y }) {
        this.weaponAttackStartPoint.x = x;
        this.weaponAttackStartPoint.y = y;
    }

    // #endregion

    isAttackReady() {
        return Date.now() - this.lastAttack.time > this.attackRate;
    }

    attack() {

    }

    update() {

    }
}

export { Weapon }