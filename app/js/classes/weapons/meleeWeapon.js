import { Weapon } from '../weapons/weapon.js'

// #region MeleeWeapon
class MeleeWeapon extends Weapon {
    constructor(name, icon, attackDamage, staminaCost, durability, reach) {
        super(name, icon, attackDamage, staminaCost, durability)
        this.reach = reach;
    }

    attack() {
        super.attack()
    }

    update() {

    }
}
// #endregion

// #region Sword
class Sword extends MeleeWeapon {
    constructor(name, icon, attackDamage, staminaCost, durability, reach) {
        super(name, icon, attackDamage, staminaCost, durability, reach)
    }
}
// #endregion

// #region Flail
class Flail extends MeleeWeapon {
    constructor(name, icon, attackDamage, staminaCost, durability, reach) {
        super(name, icon, attackDamage, staminaCost, durability, reach)
    }
}
// #endregion

// #region Axe
class Axe extends MeleeWeapon {
    constructor(name, icon, attackDamage, staminaCost, durability, reach) {
        super(name, icon, attackDamage, staminaCost, durability, reach)
    }
}
// #endregion

// #region Polearm
class Polearm extends MeleeWeapon {
    constructor(name, icon, attackDamage, staminaCost, durability, reach) {
        super(name, icon, attackDamage, staminaCost, durability, reach)
    }
}
// #endregion

// #region Mace
class Mace extends MeleeWeapon {
    constructor(name, icon, attackDamage, staminaCost, durability, reach) {
        super(name, icon, attackDamage, staminaCost, durability, reach)
    }
}
// #endregion

// #region Warmhammer
class Warmhammer extends MeleeWeapon {
    constructor(name, icon, attackDamage, staminaCost, durability, reach) {
        super(name, icon, attackDamage, staminaCost, durability, reach)
    }
}
// #endregion

export { MeleeWeapon, Sword, Flail, Axe, Polearm, Mace, Warmhammer }