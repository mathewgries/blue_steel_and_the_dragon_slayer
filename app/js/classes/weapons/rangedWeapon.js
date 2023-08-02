import { Weapon } from '../weapons/weapon.js'
import { Projectile } from './projectile.js';

class RangedWeapon extends Weapon {
    constructor({ name, icon, attackDamage, durability, maxDurability, staminaCost, projectile, ctx }) {
        super({ name, icon, attackDamage, durability, maxDurability, staminaCost, ctx })
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

class Sling extends RangedWeapon {
    constructor({ name, icon, attackDamage, durability, maxDurability, staminaCost, projectile, ctx }) {
        super({ name, icon, attackDamage, durability, maxDurability, staminaCost, projectile, ctx })
    }
}

class Bow extends RangedWeapon {
    constructor({ name, icon, attackDamage, durability, maxDurability, staminaCost, projectile, ctx }) {
        super({ name, icon, attackDamage, durability, maxDurability, staminaCost, projectile, ctx })
    }
}

class Crossbow extends RangedWeapon {
    constructor({ name, icon, attackDamage, durability, maxDurability, staminaCost, projectile, ctx }) {
        super({ name, icon, attackDamage, durability, maxDurability, staminaCost, projectile, ctx })
    }
}

export { RangedWeapon, Sling, Bow, Crossbow }