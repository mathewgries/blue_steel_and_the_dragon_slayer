import { Inventory } from "../inventory/inventory.js";
import { checkCanvasCollision } from "../../physics/collisionDetection.js";

class Player {
    constructor(x, y, width, height, speed, health, maxHealth, tileSize) {
        this.tileSize = tileSize;
        this.speed = speed;
        this.position = { x, y };
        this.dimensions = { width, height };
        this.direction = { x: 0, y: 1 };
        this.health = { health, maxHealth };
        this.attack = {
            isMoving: false,
            isAttacking: false,
            isAttackKeyPressed: false,
            direction: { x: 0, y: 1 },
            point: { x, y },
            damage: 1,
            range: tileSize / 2 + tileSize,
            duration: 100
        };
        this.knockback = {
            isActive: false,
            direction: { x: 0, y: 0 },
            speed: 5,
            distance: 5,
            duration: 250,
            frame: 0,
            maxFrames: 10
        };
        this.inventory = new Inventory();
        this.weaponSelector = {
            arrowKeyDown: false,
            cycleInterval: null,
            highlightedWeaponIndex: 0,
            selectedWeaponIndex: 0,

        };

        this.updateAttack(this.getAttackDirection().x, this.getAttackDirection().y)
        // this.setWeaponsList()
    }

    //*************************************************
    //          SETTERS AND GETTERS
    //
    //*************************************************
    //          POSITION AND DIRECTION
    //*************************************************

    setPosition({ x, y }) { this.position = { x, y } }
    getPosition() { return this.position }
    getDimensions() { return this.dimensions }
    getSpeed() { return this.speed }
    setDirection({ x, y }) { this.direction = { x: x, y: y } }
    getDirection() { return this.direction }

    //*************************************************
    //                  HEALTH
    //*************************************************

    getHealth() { return this.health }
    setCurrentHealth() { }
    getCurrentHealth() { return this.health.health }
    setMaxHealth() { }
    getMaxHealth() { return this.health.maxHealth }

    //*************************************************
    //                  ATTACK
    //*************************************************

    getAttack() { return this.attack }
    setIsMoving(bool) { this.attack.isMoving = bool }
    getIsMoving() { return this.attack.isMoving }
    setIsAttacking(bool) { this.attack.isAttacking = bool }
    getIsAttacking() { return this.attack.isAttacking }
    setIsAttackKeyPressed(bool) { this.attack.isAttackKeyPressed = bool }
    getIsAttackKeyPressed() { return this.attack.isAttackKeyPressed }
    setAttackDirection({ x, y }) { this.attack.direction = { x, y } }
    getAttackDirection() { return this.attack.direction }
    setAttackPoint({ x, y }) { this.attack.point = { x, y } }
    getAttackPoint() { return this.attack.point }
    setAttackDamage() { }
    getAttackDamage() { return this.attack.damage }
    setAttackRange() { }
    getAttackRange() { return this.attack.range }
    getAttackDuration() { return this.attack.duration }

    //*************************************************
    //                  KNOCKBACK
    //*************************************************

    getKnockback() { return this.knockback }
    setKnockbackActive(bool) { this.knockback.isActive = bool }
    getKnockbackActive() { return this.knockback.isActive }
    setKnockbackDirection({ x, y }) { this.knockback.direction = { x, y } }
    getKnockbackDirection() { return this.knockback.direction }
    getKnockbackSpeed() { return this.knockback.speed }
    getKnockbackDistance() { return this.knockback.distance }
    getKnockbackDuration() { return this.knockback.duration }
    setKnockbackFrame(num) { this.knockback.frame = num }
    getKnockbackFrame() { return this.knockback.frame }
    getKnockbackMaxFrames() { return this.knockback.maxFrames }

    //***********************************************************************

    //                              INVENTORY

    //***********************************************************************

    getInventory() { return this.inventory }

    //***********************************************************************

    //                              WEAPONS

    //***********************************************************************

    // setWeaponsList() {
    //     let index = 0
    //     for (const category in weaponData) {
    //         const selectedItem = weaponData[category].find((item) => item.isSelectable);
    //         const canBeSelected = selectedItem !== undefined;
    //         this.inventory.weapons[category] = {
    //             index: index++,
    //             canBeSelected,
    //             ...selectedItem
    //         }
    //     }
    // }
    getWeaponList() { return this.inventory.weapons }
    setEquippedWeapon(weapon) { this.equippedWeapon = weapon }
    getEquippedWeapon() { return this.equippedWeapon }

    //***********************************************************************

    //                          WEAPON SELECTOR

    //***********************************************************************

    setArrowKeyDown(bool) { this.weaponSelector.arrowKeyDown = bool }
    getArrowKeyDown() { return this.weaponSelector.arrowKeyDown }
    setWeaponCycleInternal() { }
    getWeaponCycleInterval() { return this.weaponSelector.cycleInterval }
    setHighlightedWeaponIndex(index) { this.weaponSelector.highlightedWeaponIndex = index }
    getHighlightedWeaponIndex() { return this.weaponSelector.highlightedWeaponIndex }
    setSelectedWeaponIndex(index) { this.weaponSelector.selectedWeaponIndex = index }
    getSelectedWeaponIndex() { return this.weaponSelector.selectedWeaponIndex }

    getBoundingBox() {
        return {
            x: this.getPosition().x,
            y: this.getPosition().y,
            width: this.getDimensions().width,
            height: this.getDimensions().height
        };
    }

    //***********************************************************************

    //                              WEAPONS

    //***********************************************************************

    addWeaponToInventory(weapon) {
        this.inventory.weapons.push(weapon);
    }

    equipWeapon(weapon) {
        this.equippedWeapon = weapon
    }

    checkArrowKeyPress(keys) {
        const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = keys;
        return ArrowLeft || ArrowRight || ArrowUp || ArrowDown;
    }

    startWeaponCycling() {
        // Start the cycling interval
        this.cycleInterval = setInterval(() => {
            this.cycleWeaponList();
        }, 200); // Adjust the delay as needed
    }

    stopWeaponCycling() {
        // Stop the cycling interval
        clearInterval(this.cycleInterval);
        this.cycleInterval = null;
    }

    //***********************************************************************

    //                      MOVEMENT AND DIRECTION

    //***********************************************************************

    normalizeDirectionVector(xDirection, yDirection) {
        let x = xDirection
        let y = yDirection
        const length = Math.sqrt(x * x + y * y);
        if (length !== 0) {
            x /= length;
            y /= length;
        }
        return { x, y }
    }

    handleNormalMovement(keys, playerMovement) {
        this.setDirection({ x: 0, y: 0 });

        if (keys['w']) {
            this.setDirection({ x: this.getDirection().x, y: this.getDirection().y - 1 });
        }
        if (keys['s']) {
            this.setDirection({ x: this.getDirection().x, y: this.getDirection().y + 1 });
        }
        if (keys['a']) {
            this.setDirection({ x: this.getDirection().x - 1, y: this.getDirection().y });
        }
        if (keys['d']) {
            this.setDirection({ x: this.getDirection().x + 1, y: this.getDirection().y });
        }
        const direction = this.normalizeDirectionVector(this.getDirection().x, this.getDirection().y);
        this.setDirection({ x: direction.x, y: direction.y })
        // Update player position based on direction and speed
        this.setPosition({
            x: this.getPosition().x + this.getDirection().x * playerMovement,
            y: this.getPosition().y + this.getDirection().y * playerMovement,
        });

        this.setIsMoving(this.getDirection().x !== 0 || this.getDirection().y !== 0);
        if (this.getIsMoving()) {
            this.updateAttack(this.getDirection().x, this.getDirection().y)
        }
    }

    knockbackLoop() {
        if (this.getKnockbackFrame() < this.getKnockbackMaxFrames()) {
            // Update the player's position incrementally based on knockback direction and speed
            this.setPosition({
                x: this.getPosition().x + this.getKnockbackDirection().x * this.getKnockbackSpeed(),
                y: this.getPosition().y + this.getKnockbackDirection().y * this.getKnockbackSpeed(),
            });
            this.updateAttack(this.getAttackDirection().x, this.getAttackDirection().y)
            // Increment the frame counter
            this.setKnockbackFrame(this.getKnockbackFrame() + 1);
            // Request the next frame
            requestAnimationFrame(this.knockbackLoop.bind(this));
        }
    }

    startKnockback() {
        if (this.getKnockbackActive()) {
            return;
        }

        this.setKnockbackActive(true);
        this.setKnockbackFrame(0);
        this.knockbackLoop();

        setTimeout(() => {
            this.setKnockbackActive(false);
        }, this.getKnockbackDuration());
    }

    //***********************************************************************

    //                             ATTACKING

    //***********************************************************************

    updateAttack(xDirection, yDirection) {
        const direction = this.normalizeDirectionVector(xDirection, yDirection)
        this.setAttackDirection({ x: direction.x, y: direction.y })
        this.setAttackPoint({
            x: this.getPosition().x + this.getDimensions().width / 2 + this.getAttackDirection().x * this.getAttackRange(),
            y: this.getPosition().y + this.getDimensions().height / 2 + this.getAttackDirection().y * this.getAttackRange()
        })
    }

    startAttack() {
        if (this.getIsAttacking()) {
            return;
        }
        this.setIsAttacking(true);
        setTimeout(() => {
            this.setIsAttacking(false);
        }, this.getAttackDuration());
    }

    attackEnemy(enemy, ctx) {
        // Check if the attack point collides with the enemy's bounding box
        if (
            this.getAttackPoint().x >= enemy.getPosition().x &&
            this.getAttackPoint().x <= enemy.getPosition().x + enemy.getDimensions().width &&
            this.getAttackPoint().y >= enemy.getPosition().y &&
            this.getAttackPoint().y <= enemy.getPosition().y + enemy.getDimensions().height
        ) {
            // Enemy is within attack range, apply the attack logic here
            enemy.takeDamage(this.getAttackDamage());
        }
    }

    //***********************************************************************

    //                          HEALTH AND DAMAGE

    //***********************************************************************

    handleCollisionWithEnemy(enemy) {
        if (this.getKnockbackActive()) {
            return;
        }

        // Calculate the direction of the knockback effect based on the player's position and the enemy's position
        const centerPlayerX = this.getPosition().x + this.getDimensions().width / 2;
        const centerPlayerY = this.getPosition().y + this.getDimensions().height / 2;
        const centerEnemyX = enemy.getPosition().x + enemy.getDimensions().width / 2;
        const centerEnemyY = enemy.getPosition().y + enemy.getDimensions().height / 2;

        const deltaX = centerPlayerX - centerEnemyX;
        const deltaY = centerPlayerY - centerEnemyY;

        this.setKnockbackDirection({
            x: deltaX > 0 ? 1 : -1,
            y: deltaY > 0 ? 1 : -1
        });

        // Apply the knockback effect to the player
        this.startKnockback();
        this.takeDamage(enemy.getAttackDamage());
    }

    takeDamage(damage) {
        const val = this.getCurrentHealth() - damage
        this.setCurrentHealth(val)
        if (this.getCurrentHealth() <= 0) {
            // Handle player defeated
        }
    }

    //***********************************************************************

    //                          UPDATE AND DRAW

    //***********************************************************************

    updatePlayer(keys, ctx, canvas, deltaTime) {
        const playerMovement = this.getSpeed() * deltaTime;
        if (!this.getKnockbackActive()) {
            this.handleNormalMovement(keys, playerMovement)
        }

        if (keys["k"] && !this.getIsAttacking() && !this.getIsAttackKeyPressed()) {
            this.startAttack();
            this.setIsAttackKeyPressed(true); // Set the flag to true when "k" is pressed
        }

        // Check if the "k" key is released and reset the flag
        if (!keys["k"]) {
            this.setIsAttackKeyPressed(false);
        }

        if (!this.getArrowKeyDown() && this.checkArrowKeyPress()) {
            this.setArrowKeyDown(true)
        } else if (this.getArrowKeyDown() && !this.checkArrowKeyPress()) {
            this.setArrowKeyDown(false)
        }

        if (this.getArrowKeyDown()) {

        }

        const playerBox = this.getBoundingBox();
        // Handle collision detection
        if (checkCanvasCollision(this, canvas)) {
            this.setPosition({
                x: Math.max(0, Math.min(this.getPosition().x, canvas.width - this.getDimensions().width)),
                y: Math.max(0, Math.min(this.getPosition().y, canvas.height - this.getDimensions().height))
            })
        }

        this.draw(ctx)

        if (this.getIsAttacking()) {
            this.drawAttackPoint(ctx)
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'blue'; // Draw the player on the canvas
        ctx.fillRect(
            this.getPosition().x,
            this.getPosition().y,
            this.getDimensions().width,
            this.getDimensions().height
        );
    }

    // THESE DRAWS ARE FOR TESTING CURRENTLY
    drawPlayerDirection(ctx) {
        const centerX = this.getPosition().x + this.getDimensions().width / 2;
        const centerY = this.getPosition().y + this.getDimensions().height / 2;
        ctx.fillStyle = 'red';
        const dotSize = 10;
        // CAN PROBABLY USE THIS FOR THE SPRITE
        if (this.getDirection().x > 0) { // Facing right
            ctx.fillRect(centerX, centerY - dotSize / 2, dotSize, dotSize);
        } else if (this.getDirection().x < 0) { // Facing left
            ctx.fillRect(centerX - dotSize, centerY - dotSize / 2, dotSize, dotSize);
        } else if (this.getDirection().y > 0) { // Facing down
            ctx.fillRect(centerX - dotSize / 2, centerY, dotSize, dotSize);
        } else if (this.getDirection().y < 0) { // Facing up
            ctx.fillRect(centerX - dotSize / 2, centerY - dotSize, dotSize, dotSize);
        }
    }

    drawAttackPoint(ctx) {
        ctx.beginPath();
        ctx.arc(this.getAttackPoint().x, this.getAttackPoint().y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}

{/************************************************************************************************ 

                                        EXPORTS

**************************************************************************************************/}

// Export the function so it can be used in the main game.js file
export { Player };