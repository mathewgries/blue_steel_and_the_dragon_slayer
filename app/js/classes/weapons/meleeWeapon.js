import Weapon from '../weapons/weapon.js'

class MeleeWeapon extends Weapon {
    constructor({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas }) {
        super({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, canvas });
        this.duration = duration;
        this.reach = reach;
        this.isAttack = false;
        this.useStamina = true;
        this.attackPoint = null;
    }

    handleAttackEnemy({ entity }) {
        if (
            this.attackPoint.x >= entity.position.x &&
            this.attackPoint.x <= entity.position.x + entity.dimensions.width &&
            this.attackPoint.y >= entity.position.y &&
            this.attackPoint.y <= entity.position.y + entity.dimensions.height
        ) {
            enemy.takeDamage({ entity: this });
            enemy.handleCollisionWithWeapon({ entity: this });
        }
    }

    setAttackPoint() {
        this.attackPoint = {
            x: this.attackStartPoint.x + this.direction.x * this.reach,
            y: this.attackStartPoint.y + this.direction.y * this.reach
        };
    }

    attack() {
        super.attack();
        setTimeout(() => {
            this.isAttack = false;
            this.useStamina = true;
        }, this.duration);
    }

    update({ startPoint, keys, direction, stamina }) {
        super.update({ startPoint, keys, direction, stamina });
        if (this.isAttack) {
            this.drawAttackPoint();
        }
        this.setAttackPoint();
    }

    drawAttackPoint() {
        this.ctx.beginPath();
        this.ctx.arc(this.attackPoint.x, this.attackPoint.y, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.closePath();
    }
}

// #region Sword
class Sword extends MeleeWeapon {
    constructor({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas }) {
        super({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas })
    }
}
// #endregion
// #region Flail
class Flail extends MeleeWeapon {
    constructor({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas }) {
        super({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas })
    }
}
// #endregion
// #region Axe
class Axe extends MeleeWeapon {
    constructor({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas }) {
        super({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas })
    }
}
// #endregion
// #region Polearm
class Polearm extends MeleeWeapon {
    constructor({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas }) {
        super({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas })
    }
}
// #endregion
// #region Mace
class Mace extends MeleeWeapon {
    constructor({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas }) {
        super({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas })
    }
}
// #endregion
// #region Warmhammer
class Warmhammer extends MeleeWeapon {
    constructor({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas }) {
        super({ weaponClass, type, name, icon, attackDamage, staminaCost, durability, durabilityRate, attackRate, duration, reach, canvas })
    }
}
// #endregion

export { MeleeWeapon, Sword, Flail, Axe, Polearm, Mace, Warmhammer };