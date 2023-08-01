import { Weapon } from '../weapons/weapon.js'

class RangedWeapon extends Weapon {
    constructor({ name, icon, attackDamage, durability, maxDurability, staminaCost, distance, projectileSpeed, projectileType }) {
        super({ name, icon, attackDamage, durability, maxDurability, staminaCost })
        this.distance = distance;
        this.projectileSpeed = projectileSpeed;
        this.projectileType = projectileType;
    }
}

class Sling extends RangedWeapon {
    constructor({ name, icon, attackDamage, durability, maxDurability, staminaCost, distance, projectileSpeed, projectileType }) {
        super({ name, icon, attackDamage, durability, maxDurability, staminaCost, distance, projectileSpeed, projectileType })
    }
}

class Bow extends RangedWeapon {
    constructor({ name, icon, attackDamage, durability, maxDurability, staminaCost, distance, projectileSpeed, projectileType }) {
        super({ name, icon, attackDamage, durability, maxDurability, staminaCost, distance, projectileSpeed, projectileType })
    }
}

class Crossbow extends RangedWeapon {
    constructor({ name, icon, attackDamage, durability, maxDurability, staminaCost, distance, projectileSpeed, projectileType }) {
        super({ name, icon, attackDamage, durability, maxDurability, staminaCost, distance, projectileSpeed, projectileType })
    }
}

export { RangedWeapon, Sling, Bow, Crossbow }