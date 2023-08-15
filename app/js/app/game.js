import { Zombie } from "../classes/entities/enemy.js";
import { ApplyItem, StorageItem } from "../classes/dropItems/dropItem.js";
import { entityData } from "../../data/entityData.js";
import { dropItemData } from "../../data/dropItemData.js";
import { checkAABBCollision } from "../physics/collisionDetection.js";

export default class Game {
    constructor({ userInterface, canvas, player, inventory, keys }) {
        this.userInterface = userInterface;
        this.canvas = canvas;
        this.player = player;
        this.inventory = inventory;
        this.equippedWeapon = inventory.equippedWeapon;
        this.deltaTime = 1 / 60;
        this.keys = keys;

        this.enemies = [];
        this.playerProjectiles = [];
        this.dropItems = [];

        this.enemies.push(new Zombie({ ...entityData.zombie, canvas: this.canvas }));

        this.dropItems.push(new StorageItem({
            ...dropItemData['bomb'],
            canvas: this.canvas,
            xPosition: 100,
            yPosition: 100,
        }));

        this.dropItems.push(new StorageItem({
            ...dropItemData['bomb'],
            canvas: this.canvas,
            xPosition: 150,
            yPosition: 150,
        }));
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
        const player = this.player;
        const playerProjectiles = this.playerProjectiles;

        const startPoint = {
            x: player.position.x + player.dimensions.width / 2,
            y: player.position.y + player.dimensions.height / 2
        };
        weapon.update({
            startPoint,
            keys: this.keys,
            direction: player.direction,
            stamina: !player.staminaRefillPaused
        });

        if (weapon.weaponClass === 'ranged') {
            if (weapon.isAttack) {
                playerProjectiles.push(weapon.createProjectile());
                player.depleteStamina(weapon.staminaCost);
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
                    if (weapon.useStamina) {
                        player.depleteStamina(weapon.staminaCost);
                        weapon.useStamina = false;
                    }

                }
            }
        }
    }

    updateDropItems() {
        const items = this.dropItems;
        const player = this.player;

        for (const item of items) {
            item.update(player);
            if (item.isPickedUp) {
                item.applyEffect(player);
            }
        }
    }

    updateEntityLists() {
        this.playerProjectiles = this.playerProjectiles.filter((projectile) => !projectile.toBeRemoved);
        this.enemies = this.enemies.filter((enemy) => !enemy.toBeRemoved);
        this.dropItems = this.dropItems.filter((item) => !item.toBeRemoved);
    }

    update() {
        this.updateCanvas();
        this.updatePlayer();
        this.updateInventory();
        this.updateEquippedWeapon();
        this.updatePlayerProjectiles();
        this.updateEnemies();
        this.updateDropItems();

        this.updateEntityLists();
    }
}