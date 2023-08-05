import { Weapon } from '../weapons/weapon.js'
import { Projectile } from './projectile.js';

// #region RangedWeapon
class RangedWeapon extends Weapon {
    constructor({ name, icon, attackDamage, staminaCost, durability, projectile, ctx }) {
        super({ name, icon, attackDamage, staminaCost, durability, ctx })
        this.projectile = projectile;
        this.projectiles = []
    }

    attack() {
        super.attack()
    }

    update(deltaTime) {
        if (this.projectiles.length > 0) {

        }
    }
}
// #endregion

// #region Sling
class Sling extends RangedWeapon {
    constructor({ name, icon, attackDamage, staminaCost, durability, projectile, ctx }) {
        super({ name, icon, attackDamage, staminaCost, durability, projectile, ctx })
    }
}
// #endregion

// #region Bow
class Bow extends RangedWeapon {
    constructor({ name, icon, attackDamage, staminaCost, durability, projectile, ctx }) {
        super({ name, icon, attackDamage, staminaCost, durability, projectile, ctx })
    }
}
// #endregion

// #region Crossbow
class Crossbow extends RangedWeapon {
    constructor({ name, icon, attackDamage, staminaCost, durability, projectile, ctx }) {
        super({ name, icon, attackDamage, staminaCost, durability, projectile, ctx })
    }
}
// #endregion

export { RangedWeapon, Sling, Bow, Crossbow }