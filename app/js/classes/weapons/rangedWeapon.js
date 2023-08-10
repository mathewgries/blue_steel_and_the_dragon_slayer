import { Weapon } from '../weapons/weapon.js'
import { Projectile } from './projectile.js';
import { projecttileData } from '../../../data/projectileData.js';
import { checkCanvasCollision } from '../../physics/collisionDetection.js';

// #region RangedWeapon
class RangedWeapon extends Weapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, range, projectileType, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, canvas })
        this.range = range;
        this.projectileType = projectileType;
        this.projectiles = [];
    }

    attack({ position }) {
        super.attack({ position })
        this.projectiles.push(
            new Projectile({
                ...projecttileData[this.projectileType],
                canvas: this.canvas,
                xPosition: this.attackStartPoint.x + 8,
                yPosition: this.attackStartPoint.y + 8,
                direction: this.direction
            })
        )
    }

    update(deltaTime) {
        if (this.projectiles.length > 0) {
            for (const projectile of this.projectiles) {
                const index = this.projectiles.indexOf(projectile);
                projectile.update(deltaTime)
                if (checkCanvasCollision(projectile.bounds, this.canvas)) {
                    projectile.toBeRemoved = true
                }
                if (projectile.distance >= this.range) {
                    projectile.toBeRemoved = true
                }
            }
            this.projectiles = this.projectiles.filter((projectile) => !projectile.toBeRemoved);
        }
    }
}
// #endregion

// #region Sling
class Sling extends RangedWeapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, range, projectileType, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, range, projectileType, canvas })
    }
}
// #endregion

// #region Bow
class Bow extends RangedWeapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, range, projectileType, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, range, projectileType, canvas })
    }
}
// #endregion

// #region Crossbow
class Crossbow extends RangedWeapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, range, projectileType, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, range, projectileType, canvas })
    }
}
// #endregion

export { RangedWeapon, Sling, Bow, Crossbow }