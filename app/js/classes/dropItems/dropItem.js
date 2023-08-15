class DropItem {
    constructor({ xPosition, yPosition, width, height, name, icon, canvas, type }) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.type = type;
        this.name = name;
        this.icon = new Image();
        this.icon.src = `../../assets/images/dropItems/${icon}`;
        this.position = { x: xPosition, y: yPosition };
        this.dimensions = { width, height };
        this.despwanTimer = 10000;
        this.isPickedUp = false;
        this.toBeRemoved = false;
    }

    checkPickUp(player) {
        if (
            this.position.x < player.position.x + player.dimensions.width &&
            this.position.x + player.dimensions.width > player.position.x &&
            this.position.y < player.position.y + player.dimensions.height &&
            this.position.y + this.dimensions.height > player.position.y
        ) {
            this.isPickedUp = true;
            this.toBeRemoved = true;
        }
    }

    update(player) {
        this.checkPickUp(player);
        this.draw();
    }

    draw() {
        this.ctx.drawImage(
            this.icon,
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height
        );
    }
}

class ApplyItem extends DropItem {
    constructor({ xPosition, yPosition, width, height, name, icon, type, amount, canvas }) {
        super({ xPosition, yPosition, width, height, name, icon, type, canvas });
        this.amount = amount;
    }

    applyEffect(player) {
        let amount = 0;
        if (this.type === 'health') {
            if (this.name === 'full_hoagie') {
                amount = (player.maxHealth / 2);
            }
            if (this.name === 'half_hoagie') {
                amount = (player.maxHealth / 4);
            }
            player.increaseHealth(amount);
        }
        if (this.type === 'stamina') {
            if (this.name === 'large_chip') {
                amount += (player.maxStamina / 2);
            }
            if (this.name === 'small_chip') {
                amount += (player.maxStamina / 4);
            }
            player.increaseStamina(amount);
        }
    }
}

class StorageItem extends DropItem {
    constructor({ xPosition, yPosition, width, height, name, icon, category, type, canvas }) {
        super({ xPosition, yPosition, width, height, name, icon, type, canvas });
        this.category = category;
    }

    applyEffect(player) {
        const inventory = player.inventory;
        if (this.category === 'potion') {
            inventory.addPotion(this.type);
        }
        if (this.category === 'material') {
            inventory.addMaterial(this.type);
        }
        if (this.category === 'bomb') {
            inventory.addBomb();
        }
    }
}

export { DropItem, ApplyItem, StorageItem };