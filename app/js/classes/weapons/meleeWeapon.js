import { Weapon } from '../weapons/weapon.js'

// #region MeleeWeapon
class MeleeWeapon extends Weapon {
    constructor(name, type, icon, attackDamage, staminaCost, durability, reach, canvas) {
        super(name, type, icon, attackDamage, staminaCost, durability, canvas)
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
    constructor(name, type, icon, attackDamage, staminaCost, durability, reach, canvas) {
        super(name, type, icon, attackDamage, staminaCost, durability, reach, canvas)
    }
}
// #endregion

// #region Flail
class Flail extends MeleeWeapon {
    constructor(name, type, icon, attackDamage, staminaCost, durability, reach, canvas) {
        super(name, type, icon, attackDamage, staminaCost, durability, reach, canvas)
    }
}
// #endregion

// #region Axe
class Axe extends MeleeWeapon {
    constructor(name, type, icon, attackDamage, staminaCost, durability, reach, canvas) {
        super(name, type, icon, attackDamage, staminaCost, durability, reach, canvas)
    }
}
// #endregion

// #region Polearm
class Polearm extends MeleeWeapon {
    constructor(name, type, icon, attackDamage, staminaCost, durability, reach, canvas) {
        super(name, type, icon, attackDamage, staminaCost, durability, reach, canvas)
    }
}
// #endregion

// #region Mace
class Mace extends MeleeWeapon {
    constructor(name, type, icon, attackDamage, staminaCost, durability, reach, canvas) {
        super(name, type, icon, attackDamage, staminaCost, durability, reach, canvas)
    }
}
// #endregion

// #region Warmhammer
class Warmhammer extends MeleeWeapon {
    constructor(name, type, icon, attackDamage, staminaCost, durability, reach, canvas) {
        super(name, type, icon, attackDamage, staminaCost, durability, reach, canvas)
    }
}
// #endregion

export { MeleeWeapon, Sword, Flail, Axe, Polearm, Mace, Warmhammer }