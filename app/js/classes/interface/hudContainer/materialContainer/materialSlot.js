export default class MaterialSlot {
    constructor({material, width, height }) {
        this.imagePath = '`../../assets/images/materials/';
        this.container = document.createElement('div');
        this.container.setAttribute('id', `${material.name}-slot`);
        this.container.style.flex = '0 0 calc(25%)';
        this.container.style.height = '80%';
        this.container.style.boxSizing = 'border-box';
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.materialDisplay = document.createElement('div');
        this.materialDisplay.style.border = '3px solid whitesmoke';
        this.materialDisplay.style.borderRadius = '10px';
        this.materialDisplay.style.margin = '0 auto';
        this.materialDisplay.style.width = '70%';

        this.imageContainer = document.createElement("div");
        this.imageContainer.classList.add("material-image-container");
        this.imageContainer.style.width = '100%';
        this.imageContainer.style.height = '60%';

        this.imageWrapper = document.createElement("div");
        this.imageWrapper.classList.add("material-image-wrapper");
        this.imageWrapper.style.width = '90%';
        this.imageWrapper.style.height = '90%';
        this.imageWrapper.style.margin = '0 auto';

        this.img = document.createElement("img");
        this.img.src = `${this.imagePath}${material.icon}`;
        this.img.alt = `${material.name} Icon`;
        this.img.style.width = '100%';
        this.img.style.height = '100%';

        this.labelContainer = document.createElement('div');
        this.labelContainer.innerText = material.label;
        this.labelContainer.style.textAlign = 'center';
        this.labelContainer.style.width = '100%';
        this.labelContainer.style.height = '12%';

        this.imageWrapper.appendChild(this.img);
        this.imageContainer.appendChild(this.imageWrapper);
        this.materialDisplay.appendChild(this.imageContainer);
        this.materialDisplay.appendChild(this.labelContainer);
        this.container.appendChild(this.materialDisplay);
    }

    resize({ width, height }) {
        this.container.style.flex = '0 0 calc(25%)';
        this.container.style.height = '80%';
        this.materialDisplay.style.width = '70%';
        this.materialDisplay.style.height = '100%';
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

    update() {

    }
}