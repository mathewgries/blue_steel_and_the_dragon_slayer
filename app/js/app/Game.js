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

    updateInterface() {
        this.userInterface.update();
    }

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
        const startPoint = {
            x: this.player.position.x + this.player.dimensions.width / 2,
            y: this.player.position.y + this.player.dimensions.height / 2
        };
        this.equippedWeapon.update({
            startPoint,
            keys: this.keys,
            direction: this.player.direction
        });

        if (this.equippedWeapon.weaponClass === 'ranged') {
            if (this.equippedWeapon.isAttack) {
                this.playerProjectiles.push(this.equippedWeapon.createProjectile());
                this.equippedWeapon.isAttack = false;
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
        for (const enemy of this.enemies) {
            enemy.update(this.deltaTime)

            if (checkAABBCollision(this.player.bounds, enemy.bounds)) {
                this.player.takeDamage(enemy)
                this.player.handleCollisionWithEntity(enemy)
            }

            if (this.playerProjectiles.length > 0) {
                for (const projectile of this.playerProjectiles) {
                    if (checkAABBCollision(projectile.bounds, enemy.bounds)) {
                        enemy.takeDamage(projectile)
                        enemy.handleCollisionWithEntity(projectile)
                        projectile.toBeRemoved = true;
                    }
                }
            }

            if (this.equippedWeapon.weaponClass === 'melee') {
                if (this.equippedWeapon.isAttack) {
                    this.equippedWeapon.handleAttackEnemy(enemy)
                }
            }
        }
    }

    updateEntityLists() {
        this.playerProjectiles = this.playerProjectiles.filter((projectile) => !projectile.toBeRemoved)
        this.enemies = this.enemies.filter((enemy) => !enemy.toBeRemoved)
    }

    update() {
        this.updateInterface();
        this.updateCanvas();
        this.updatePlayer();
        this.updateInventory();
        this.updateEquippedWeapon();
        this.updatePlayerProjectiles();
        this.updateEnemies();

        this.updateEntityLists()
    }
}