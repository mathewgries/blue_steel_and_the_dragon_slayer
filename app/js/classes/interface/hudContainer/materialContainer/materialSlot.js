export default class MaterialSlot {
    constructor({ material }) {
        this.imagePath = '`../../assets/images/materials';
        this.container = this.buildContainer({ name: material.name });
        this.materialDisplay = this.buildDisplay();
        this.imageContainer = this.buildImageContainer();
        this.imageWrapper = this.buildImageWrapper({ name: material.name, icon: material.icon, path: this.imagePath });
        this.labelContainer = this.buildLabelContainer({ label: material.label })
        this.countContainer = this.buildCountContainer({ name: material.name });
        this.imageContainer.appendChild(this.imageWrapper);
        this.materialDisplay.appendChild(this.imageContainer);
        this.materialDisplay.appendChild(this.labelContainer);
        this.materialDisplay.appendChild(this.countContainer);
        this.container.appendChild(this.materialDisplay);
    }

    buildContainer({ name }) {
        const container = document.createElement('div');
        container.setAttribute('id', `${name}-slot`);
        container.classList.add('material-slot');
        return container;
    }

    buildDisplay() {
        const materialDisplay = document.createElement('div');
        materialDisplay.classList.add('material-slot-display');
        return materialDisplay;
    }

    buildImageContainer() {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("material-image-container");
        return imageContainer;
    }

    buildImageWrapper({ name, icon, path }) {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("material-image-wrapper");
        const img = document.createElement("img");
        img.classList.add("material-image");
        img.src = `${path}/${icon}`;
        img.alt = `${name} Icon`;
        imageWrapper.appendChild(img);
        return imageWrapper;
    }

    buildLabelContainer({ label }) {
        const labelContainer = document.createElement('div');
        labelContainer.classList.add("material-label-container");
        labelContainer.innerText = label;
        return labelContainer;
    }

    buildCountContainer({ name }) {
        const countContainer = document.createElement('div');
        countContainer.classList.add('material-count-container');
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