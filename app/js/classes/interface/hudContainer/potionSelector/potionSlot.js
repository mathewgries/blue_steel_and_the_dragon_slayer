export default class PotionSlot {
    constructor({ potion }) {
        this.imagePath = '`../../assets/images/potions';
        this.container = this.buildContainer({ name: potion.name });
        this.potionDisplay = this.buildPotionDisplay();
        this.imageContainer = this.buildImageContainer()
        this.imageWrapper = this.buildImageWrapper({ name: potion.name, path: this.imagePath, icon: potion.icon })
        this.labelContainer = this.buildLabel({ label: potion.label });
        this.countContainer = this.buildCountContainer({name: potion.name})
        this.imageContainer.appendChild(this.imageWrapper);
        this.potionDisplay.appendChild(this.imageContainer);
        this.potionDisplay.appendChild(this.labelContainer);
        this.potionDisplay.appendChild(this.countContainer);
        this.container.appendChild(this.potionDisplay);
    }

    buildContainer({ name }) {
        const container = document.createElement('div');
        container.setAttribute('id', `${name}-slot`);
        container.classList.add('potion-slot');
        return container;
    }

    buildPotionDisplay() {
        const potionDisplay = document.createElement('div');
        potionDisplay.classList.add('potion-slot-display');
        return potionDisplay;
    }

    buildImageContainer() {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("potion-image-container");
        return imageContainer;
    }

    buildImageWrapper({ name, path, icon }) {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("potion-image-wrapper");
        const img = document.createElement("img");
        img.classList.add('potion-image');
        img.src = `${path}/${icon}`;
        img.alt = `${name} Icon`;
        imageWrapper.appendChild(img);
        return imageWrapper;
    }

    buildLabel({ label }) {
        const labelContainer = document.createElement('div');
        labelContainer.classList.add('potion-label-container');
        labelContainer.innerText = label;
        return labelContainer;
    }

    buildCountContainer({name}){
        const countContainer = document.createElement('div');
        countContainer.classList.add('potion-count-container');
        countContainer.setAttribute('id', `${name}-count`);
        countContainer.innerText = "0";
        return countContainer;
    }

    resize() {
        this.labelContainer.style.fontSize = `${this.labelContainer.offsetHeight}px`;
        this.countContainer.style.fontSize = `${this.countContainer.offsetHeight}px`;
        this.imgContainerHeight = this.imageContainer.offsetHeight;
        this.imgWrapperHeight = this.imageWrapper.offsetHeight;
        this.imageWrapper.style.marginTop = `${(this.imgContainerHeight / 2) - (this.imgWrapperHeight / 2)}px`;
    }
}