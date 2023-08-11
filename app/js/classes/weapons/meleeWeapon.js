import { Weapon } from '../weapons/weapon.js'

class MeleeWeapon extends Weapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, canvas })
        this.reach = reach;
        this.duration = 500;
        this.isAttack = false;
        this.attackPoint = null;
    }

    attack({ position, dimensions }) {
        super.attack({ position, dimensions });
        this.attackPoint = {
            x: this.attackStartPoint.x + this.direction.x * this.reach,
            y: this.attackStartPoint.y + this.direction.y * this.reach
        };
        this.isAttack = true;
        setTimeout(() => {
            this.isAttack = false
            this.attackPoint = null
        }, this.duration);
    }

    handleAttackEnemy(enemy) {
        if (
            this.attackPoint.x >= enemy.position.x &&
            this.attackPoint.x <= enemy.position.x + enemy.dimensions.width &&
            this.attackPoint.y >= enemy.position.y &&
            this.attackPoint.y <= enemy.position.y + enemy.dimensions.height
        ) {
            enemy.takeDamage(this);
            enemy.handleCollisionWithWeapon(this)
        }
    }

    update(deltaTime) {
        super.update();
        if (this.isAttack) {
            this.drawAttackPoint();
        }
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
    constructor({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas })
    }
}
// #endregion

// #region Flail
class Flail extends MeleeWeapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas })
    }
}
// #endregion

// #region Axe
class Axe extends MeleeWeapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas })
    }
}
// #endregion

// #region Polearm
class Polearm extends MeleeWeapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas })
    }
}
// #endregion

// #region Mace
class Mace extends MeleeWeapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas })
    }
}
// #endregion

// #region Warmhammer
class Warmhammer extends MeleeWeapon {
    constructor({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas }) {
        super({ name, type, icon, attackDamage, staminaCost, durability, reach, canvas })
    }
}
// #endregion

export { MeleeWeapon, Sword, Flail, Axe, Polearm, Mace, Warmhammer }