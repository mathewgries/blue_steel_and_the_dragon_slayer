export default class PotionSlot {
    constructor({ potion, width, height }) {
        this.imagePath = '`../../assets/images/potions/';
        this.container = document.createElement('div');
        this.container.setAttribute('id', `${potion.name}-slot`);
        this.container.style.flex = '0 0 calc(25%)';
        this.container.style.height = '80%';
        this.container.style.boxSizing = 'border-box';
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.potionDisplay = document.createElement('div');
        this.potionDisplay.style.border = '3px solid whitesmoke';
        this.potionDisplay.style.borderRadius = '10px';
        this.potionDisplay.style.margin = '0 auto';
        this.potionDisplay.style.width = '70%';

        this.imageContainer = document.createElement("div");
        this.imageContainer.classList.add("potion-image-container");
        this.imageContainer.style.width = '100%';
        this.imageContainer.style.height = '60%';

        this.imageWrapper = document.createElement("div");
        this.imageWrapper.classList.add("potion-image-wrapper");
        this.imageWrapper.style.width = '90%';
        this.imageWrapper.style.height = '90%';
        this.imageWrapper.style.margin = '0 auto';

        this.img = document.createElement("img");
        this.img.src = `${this.imagePath}${potion.icon}`;
        this.img.alt = `${potion.name} Icon`;
        this.img.style.width = '100%';
        this.img.style.height = '100%';

        this.labelContainer = document.createElement('div');
        this.labelContainer.innerText = potion.label;
        this.labelContainer.style.textAlign = 'center';
        this.labelContainer.style.width = '100%';
        this.labelContainer.style.height = '12%';

        this.imageWrapper.appendChild(this.img);
        this.imageContainer.appendChild(this.imageWrapper);
        this.potionDisplay.appendChild(this.imageContainer);
        this.potionDisplay.appendChild(this.labelContainer);
        this.container.appendChild(this.potionDisplay);
    }

    resize(width) {
        this.container.style.flex = '0 0 calc(25%)';
        this.container.style.height = '80%';
        this.potionDisplay.style.width = '70%';
        this.potionDisplay.style.height = '100%';
        this.imageContainer.style.width = '100%';
        this.imageContainer.style.height = '60%';
        this.imageWrapper.style.width = '90%';
        this.imageWrapper.style.height = '90%'
        this.img.style.width = '100%';
        this.img.style.height = '100%'
        this.imageWrapper.style.margin = '0 auto';
        this.labelContainer.style.width = '100%';
        this.labelContainer.style.height = '12%';
        this.labelContainer.style.fontSize = `${this.labelContainer.offsetHeight}px`
        this.imgContainerHeight = this.imageContainer.offsetHeight
        this.imgWrapperHeight = this.imageWrapper.offsetHeight
        this.imageWrapper.style.marginTop = `${(this.imgContainerHeight / 2) - (this.imgWrapperHeight / 2)}px`
    }

    update(width) {
        
    }
}