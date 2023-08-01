import { Weapon } from '../weapons/weapon.js'

class MeleeWeapon extends Weapon {
    constructor(name, icon, attackDamage, durability, maxDurability, staminaCost, reach) {
        super(name, icon, attackDamage, durability, maxDurability, staminaCost)
        this.reach = reach;
    }
}

class Sword extends MeleeWeapon {
    constructor(name, icon, attackDamage, durability, maxDurability, staminaCost, reach) {
        super(name, icon, attackDamage, durability, maxDurability, staminaCost, reach)
    }
}

class Flail extends MeleeWeapon {
    constructor(name, icon, attackDamage, durability, maxDurability, staminaCost, reach) {
        super(name, icon, attackDamage, durability, maxDurability, staminaCost, reach)
    }
}

class Axe extends MeleeWeapon {
    constructor(name, icon, attackDamage, durability, maxDurability, staminaCost, reach) {
        super(name, icon, attackDamage, durability, maxDurability, staminaCost, reach)
    }
}

class Polearm extends MeleeWeapon {
    constructor(name, icon, attackDamage, durability, maxDurability, staminaCost, reach) {
        super(name, icon, attackDamage, durability, maxDurability, staminaCost, reach)
    }
}

class Mace extends MeleeWeapon {
    constructor(name, icon, attackDamage, durability, maxDurability, staminaCost, reach) {
        super(name, icon, attackDamage, durability, maxDurability, staminaCost, reach)
    }
}

class Warmhammer extends MeleeWeapon {
    constructor(name, icon, attackDamage, durability, maxDurability, staminaCost, reach) {
        super(name, icon, attackDamage, durability, maxDurability, staminaCost, reach)
    }
}

export { MeleeWeapon, Sword, Flail, Axe, Polearm, Mace, Warmhammer }