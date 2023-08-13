export default class MaterialSlot {
    constructor({ material }) {
        this.imagePath = '`../../assets/images/materials/';

        this.container = document.createElement('div');
        this.container.setAttribute('id', `${material.name}-slot`);
        this.container.classList.add('material-slot');

        this.materialDisplay = document.createElement('div');
        this.materialDisplay.classList.add('material-slot-display');

        this.imageContainer = document.createElement("div");
        this.imageContainer.classList.add("material-image-container");
        this.imageWrapper = document.createElement("div");
        this.imageWrapper.classList.add("material-image-wrapper");

        this.img = document.createElement("img");
        this.img.classList.add("material-image");
        this.img.src = `${this.imagePath}${material.icon}`;
        this.img.alt = `${material.name} Icon`;

        this.labelContainer = document.createElement('div');
        this.labelContainer.classList.add("material-label-container");
        this.labelContainer.innerText = material.label;

        this.countContainer = document.createElement('div');
        this.countContainer.classList.add('material-count-container');
        this.countContainer.setAttribute('id', `${material.name}-count`);
        this.countContainer.innerText = "0";

        this.imageWrapper.appendChild(this.img);
        this.imageContainer.appendChild(this.imageWrapper);
        this.materialDisplay.appendChild(this.imageContainer);
        this.materialDisplay.appendChild(this.labelContainer);
        this.materialDisplay.appendChild(this.countContainer);
        this.container.appendChild(this.materialDisplay);
    }

    resize() {
        this.labelContainer.style.fontSize = `${this.labelContainer.offsetHeight}px`;
        this.countContainer.style.fontSize = `${this.countContainer.offsetHeight}px`;
        this.imgContainerHeight = this.imageContainer.offsetHeight;
        this.imgWrapperHeight = this.imageWrapper.offsetHeight;
        this.imageWrapper.style.marginTop = `${(this.imgContainerHeight / 2) - (this.imgWrapperHeight / 2)}px`;
    }
}