import { Weapon } from '../weapons/weapon.js'
import { Projectile } from './projectile.js';
import { projecttileData } from '../../../data/projectileData.js';
import { checkCanvasCollision } from '../../physics/collisionDetection.js';

class RangedWeapon extends Weapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, range, projectileType, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, canvas })
        this.range = range;
        this.projectileType = projectileType;
        this.projectiles = [];
    }

    attack({ position, dimensions }) {
        super.attack({ position, dimensions })
        this.projectiles.push(
            new Projectile({
                ...projecttileData[this.projectileType],
                canvas: this.canvas,
                xPosition: this.attackStartPoint.x,
                yPosition: this.attackStartPoint.y,
                direction: this.direction
            })
        )
    }

    update(deltaTime) {
        if (this.projectiles.length > 0) {
            for (const projectile of this.projectiles) {
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