import { Zombie } from "../classes/entities/enemy.js";
import { entityData } from "../../data/entityData.js";
import { checkAABBCollision } from "../physics/collisionDetection.js";

export default class Game {
    constructor({ userInterface, canvas, player, inventory, keys }) {
        this.userInterface = userInterface;
        this.canvas = canvas;
        this.player = player;
        this.inventory = inventory;
        this.equippedWeapon = inventory.equippedWeapon;
        this.playerProjectiles = [];
        this.deltaTime = 1 / 60;
        this.keys = keys;
        this.enemies = [];
        this.enemies.push(new Zombie({ ...entityData.zombie, canvas: this.canvas }));
    }

    resize({ viewWidth, viewHeight }) {
        this.userInterface.resize({ viewWidth, viewHeight });
    }

    render() { }

    updateCanvas() {
        this.canvas.update();
    }

    updatePlayer() {
        this.player.update({ keys: this.keys, deltaTime: this.deltaTime });
    }

    updateInventory() {
        this.inventory.update({
            direction: this.player.direction,
            keys: this.keys,
            deltaTime: this.deltaTime
        });
    }

    updateEquippedWeapon() {
        this.equippedWeapon = this.inventory.equippedWeapon;
        const weapon = this.equippedWeapon;
        const startPoint = {
            x: this.player.position.x + this.player.dimensions.width / 2,
            y: this.player.position.y + this.player.dimensions.height / 2
        };
        weapon.update({
            startPoint,
            keys: this.keys,
            direction: this.player.direction
        });

        if (weapon.weaponClass === 'ranged') {
            if (weapon.isAttack && !weapon.isBroken) {
                this.playerProjectiles.push(weapon.createProjectile());
                weapon.isAttack = false;
            }
        }
    }

    updatePlayerProjectiles() {
        if (this.playerProjectiles.length > 0) {
            for (const projectile of this.playerProjectiles) {
                projectile.update({ deltaTime: this.deltaTime });
            }
        }
    }

    updateEnemies() {
        const player = this.player;
        const weapon = this.equippedWeapon;
        const playerProjectiles = this.playerProjectiles;

        for (const enemy of this.enemies) {
            enemy.update(this.deltaTime);

            if (checkAABBCollision(player.bounds, enemy.bounds)) {
                player.takeDamage(enemy);
                player.handleCollisionWithEntity(enemy);
            }

            if (playerProjectiles.length > 0) {
                for (const projectile of playerProjectiles) {
                    if (checkAABBCollision(projectile.bounds, enemy.bounds)) {
                        enemy.takeDamage(projectile);
                        enemy.handleCollisionWithEntity(projectile);
                        projectile.toBeRemoved = true;
                    }
                }
            }

            if (weapon.weaponClass === 'melee') {
                if (weapon.isAttack) {
                    weapon.handleAttackEnemy(enemy);
                }
            }
        }
    }

    updateEntityLists() {
        this.playerProjectiles = this.playerProjectiles.filter((projectile) => !projectile.toBeRemoved);
        this.enemies = this.enemies.filter((enemy) => !enemy.toBeRemoved);
    }

    update() {
        this.updateCanvas();
        this.updatePlayer();
        this.updateInventory();
        this.updateEquippedWeapon();
        this.updatePlayerProjectiles();
        this.updateEnemies();

        this.updateEntityLists();
    }
}