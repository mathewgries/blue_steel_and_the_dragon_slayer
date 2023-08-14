export default class PotionSlot {
    constructor({ potion }) {
        this.imagePath = '`../../assets/images/potions/';
        this.container = document.createElement('div');
        this.container.setAttribute('id', `${potion.name}-slot`);
        this.container.classList.add('potion-slot');
        this.potionDisplay = document.createElement('div');
        this.potionDisplay.classList.add('potion-slot-display');
        this.imageContainer = document.createElement("div");
        this.imageContainer.classList.add("potion-image-container");
        this.imageWrapper = document.createElement("div");
        this.imageWrapper.classList.add("potion-image-wrapper");
        this.img = document.createElement("img");
        this.img.classList.add('potion-image');
        this.img.src = `${this.imagePath}${potion.icon}`;
        this.img.alt = `${potion.name} Icon`;
        this.labelContainer = document.createElement('div');
        this.labelContainer.classList.add('potion-label-container');
        this.labelContainer.innerText = potion.label;
        this.countContainer = document.createElement('div');
        this.countContainer.classList.add('potion-count-container');
        this.countContainer.setAttribute('id', `${potion.name}-count`);
        this.countContainer.innerText = "0";
        this.imageWrapper.appendChild(this.img);
        this.imageContainer.appendChild(this.imageWrapper);
        this.potionDisplay.appendChild(this.imageContainer);
        this.potionDisplay.appendChild(this.labelContainer);
        this.potionDisplay.appendChild(this.countContainer);
        this.container.appendChild(this.potionDisplay);
    }

    resize() {
        this.labelContainer.style.fontSize = `${this.labelContainer.offsetHeight}px`;
        this.countContainer.style.fontSize = `${this.countContainer.offsetHeight}px`;
        this.imgContainerHeight = this.imageContainer.offsetHeight;
        this.imgWrapperHeight = this.imageWrapper.offsetHeight;
        this.imageWrapper.style.marginTop = `${(this.imgContainerHeight / 2) - (this.imgWrapperHeight / 2)}px`;
    }
}