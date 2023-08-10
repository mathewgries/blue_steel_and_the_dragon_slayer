import { Zombie } from "../classes/entities/enemy.js";
import { entityData } from "../../data/entityData.js";
import { checkAABBCollision } from "../physics/collisionDetection.js";

export default class Game {
    constructor({ userInterface, canvas, player, keys }) {
        this.userInterface = userInterface;
        this.canvas = canvas;
        this.player = player;
        this.deltaTime = 1 / 60;
        this.keys = keys;
        this.enemies = []
        this.enemies.push(
            new Zombie({
                ...entityData.zombie,
                canvas: this.canvas
            })
        )
    }

    resize({ viewWidth, viewHeight }) {
        this.userInterface.resize({ viewWidth, viewHeight })
    }

    render() {
        this.userInterface.update();
    }

    update() {
        this.canvas.update();
        const playerProjectiles =
            this.player.inventory.equippedWeapon.projectiles
                ? this.player.inventory.equippedWeapon.projectiles
                : null
        this.player.update(this.keys, this.deltaTime);
        for (const enemy of this.enemies) {
            enemy.update(this.deltaTime)
            if (checkAABBCollision(this.player.bounds, enemy.bounds)) {
                this.player.takeDamage(enemy)
            }
            if(playerProjectiles){
                for(const projectile of playerProjectiles){
                    if(checkAABBCollision(projectile.bounds, enemy.bounds)){
                        enemy.takeDamage(projectile)
                        projectile.toBeRemoved = true;
                    }
                }
            }
        }
        // Update the game state based on user input, physics, collisions, etc.
        // this.weaponSelector.update(/* pass required parameters here */);
    }
}