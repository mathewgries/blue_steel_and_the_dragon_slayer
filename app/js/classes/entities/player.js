import Entity from "./entity.js";

export default class Player extends Entity {
    constructor({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, stamina, canvas }) {
        super({ xPosition, yPosition, baseWidth, baseHeight, xSpeed, ySpeed, speed, health, attackDamage, canvas })
        this.icon = new Image();
        this.icon.src = '../../assets/images/player/kikk-sample.png';
        this.stamina = stamina;
        this.maxStamina = stamina;
        this.staminaRefillRate = 0.25;
        this.staminaRefillSpeed = 100;
        this.staminaRefillPaused = false;
        this.isAttackKeyPressed = false;
        setInterval(() => this.staminaRefillTimer(), this.staminaRefillSpeed);
    }

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
        this.position = {
            x: this.position.x + this.direction.x * playerMovement,
            y: this.position.y + this.direction.y * playerMovement,
        };
    }

    takeDamage(entity) {
        super.takeDamage(entity);
        this.updateHealthMeter();
    }

    updateHealthMeter() {
        const percentage = Math.floor((this.health / this.maxHealth) * 100);
        const meterFill = document.getElementById('health-meter-fill');
        meterFill.style.width = `${percentage}%`;
        if (percentage <= 25) {
            meterFill.style.backgroundColor = 'red';
        } else if (percentage <= 50) {
            meterFill.style.backgroundColor = 'orange';
        } else {
            meterFill.style.backgroundColor = 'lightgreen';
        }
    }

    depleteStamina(staminaCost) {
        this.stamina -= staminaCost;
        this.updateStaminaMeter();

        if (this.stamina <= 0) {
            this.stamina = 0;
            this.updateStaminaMeter();
            this.staminaRefillPaused = true;
            setTimeout(() => {
                this.staminaRefillPaused = false;
            }, 5000);
        }
    }

    updateStaminaMeter() {
        const percentage = (this.stamina / this.maxStamina) * 100;
        const meterFill = document.getElementById('stamina-meter-fill');
        if (this.stamina != 0) {
            meterFill.style.width = `${percentage}%`;
            if (percentage <= 25) {
                meterFill.style.backgroundColor = 'red';
            } else if (percentage <= 50) {
                meterFill.style.backgroundColor = 'orange';
            } else {
                meterFill.style.backgroundColor = 'lightgreen';
            }
        } else {
            meterFill.style.width = '0';
            meterFill.style.backgroundColor = 'transparent';
        }

    }

    staminaRefillTimer() {
        if (!this.staminaRefillPaused && this.stamina < this.maxStamina) {
            this.stamina = Math.min(this.stamina + this.staminaRefillRate, this.maxStamina);
            this.updateStaminaMeter();
        }
    }

    update({ keys, deltaTime }) {
        const playerMovement = this.baseSpeed * deltaTime;
        if (!this.knockback.isActive) {
            this.handleNormalMovement(keys, playerMovement);
        }
        super.update();
        this.draw();
    }

    draw() {
        this.canvas.ctx.drawImage(
            this.icon,
            this.position.x,
            this.position.y,
            this.icon.width,
            this.icon.height
        );
    }
}