import Weapon from '../weapons/weapon.js'
import { Projectile } from './projectile.js';
import { projecttileData } from '../../../data/projectileData.js';


class RangedWeapon extends Weapon {
    constructor({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, attackRate, range, projectileType, canvas }) {
        super({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, attackRate, canvas })
        this.range = range;
        this.projectileType = projectileType;
        this.projectiles = [];
    }

    createProjectile() {
        return new Projectile({
            ...projecttileData[this.projectileType],
            canvas: this.canvas,
            xPosition: this.attackStartPoint.x,
            yPosition: this.attackStartPoint.y,
            direction: this.direction,
            range: this.range
        })
    }
}

// #region Sling
class Sling extends RangedWeapon {
    constructor({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, range, attackRate, projectileType, canvas }) {
        super({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, range, attackRate, projectileType, canvas })
    }
}
// #endregion
// #region Bow
class Bow extends RangedWeapon {
    constructor({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, range, attackRate, projectileType, canvas }) {
        super({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, range, attackRate, projectileType, canvas })
    }
}
// #endregion
// #region Crossbow
class Crossbow extends RangedWeapon {
    constructor({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, range, attackRate, projectileType, canvas }) {
        super({ name, type, weaponClass, icon, attackDamage, staminaCost, durability, range, attackRate, projectileType, canvas })
    }
}
// #endregion

export { RangedWeapon, Sling, Bow, Crossbow }