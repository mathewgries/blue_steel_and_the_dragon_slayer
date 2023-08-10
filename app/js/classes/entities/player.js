import Entity from "./entity.js";
import { checkCanvasCollision } from "../../physics/collisionDetection.js";

export default class Player extends Entity {
    constructor({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, canvas, inventory }) {
        super({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, canvas })
        this.inventory = inventory;
        this.icon = new Image()
        this.icon.src = '../../assets/images/player/kikk-sample.png'
        this.isAttackKeyPressed = false;
    }

    //***********************************************************************
    //                      MOVEMENT AND DIRECTION
    //***********************************************************************

    handleNormalMovement(keys, playerMovement) {
        this.direction = { x: 0, y: 0 };

        if (keys['w']) {
            this.direction = { x: this.direction.x, y: this.direction.y - 1 };
        }
        if (keys['s']) {
            this.direction = { x: this.direction.x, y: this.direction.y + 1 };
        }
        if (keys['a']) {
            this.direction = { x: this.direction.x - 1, y: this.direction.y };
        }
        if (keys['d']) {
            this.direction = { x: this.direction.x + 1, y: this.direction.y };
        }

        this.direction = this.normalizeDirectionVector(this.direction.x, this.direction.y);

        // Update player position based on direction and speed
        this.position = {
            x: this.position.x + this.direction.x * playerMovement,
            y: this.position.y + this.direction.y * playerMovement,
        };

        if (this.direction.x !== 0 || this.direction.y !== 0) {
            this.inventory.equippedWeapon.direction = this.direction
        }
    }

    //***********************************************************************
    //                             ATTACKING
    //***********************************************************************

    startAttack() {
        if (!this.inventory.equippedWeapon.isAttackReady()) {
            return;
        } else {
            this.isAttackKeyPressed = true;
            this.inventory.equippedWeapon.lastAttack = Date.now();
            this.inventory.equippedWeapon.attack({ position: this.position })
        }
    }

    //***********************************************************************
    //                          UPDATE AND DRAW
    //***********************************************************************

    update(keys, deltaTime) {
        
        const playerMovement = this.baseSpeed * deltaTime;
        if (!this.knockback.isActive) {
            this.handleNormalMovement(keys, playerMovement)
        }

        // this.inventory.update()
        if (this.inventory.equippedWeapon) {
            if (keys["k"] && !this.isAttackKeyPressed) {
                this.startAttack()
            }
            this.inventory.equippedWeapon.update(deltaTime);
        }
        if (!keys["k"] && this.isAttackKeyPressed) {
            this.isAttackKeyPressed = false;
        }

        super.update()

        // if (checkCanvasCollision(this.bounds, this.canvas)) {
        //     this.position = {
        //         x: Math.max(0, Math.min(this.position.x, this.canvas.baseDimensions.width - this.dimensions.width)),
        //         y: Math.max(0, Math.min(this.position.y, this.canvas.baseDimensions.height - this.dimensions.height))
        //     }
        // }

        this.draw()
    }

    draw() {
        this.canvas.ctx.drawImage(
            this.icon,
            this.position.x,
            this.position.y,
            this.icon.width,
            this.icon.height
        )
    }
}