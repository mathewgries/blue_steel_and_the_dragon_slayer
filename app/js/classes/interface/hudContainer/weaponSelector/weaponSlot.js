export default class WeaponSlot {
    constructor({ weapon, width, height }) {
        this.container = document.createElement('div');
        this.container.setAttribute('id', weapon);
        this.container.style.width = `${(width / 3) - 2}px`;
        this.container.style.height = '33.33%';

        this.container.style.flex = '0 0 calc(33.33% - 2px)';
        this.container.style.boxSizing = 'border-box';
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.weaponDisplay = document.createElement('div')
        this.weaponDisplay.style.border = '3px solid whitesmoke';
        this.weaponDisplay.style.borderRadius = '10px';
        this.weaponDisplay.style.margin = '0 auto';
        this.weaponDisplay.style.width = '70%';
        this.weaponDisplay.style.height = '80%';

        this.container.appendChild(this.weaponDisplay);
    }

    resize({ width, height }) {
        this.container.style.width = `${(width / 3) - 2}px`;
        this.container.style.height = '33.33%';
        this.weaponDisplay.style.width = '70%';
        this.weaponDisplay.style.height = '80%';
    }

    update(width) {

    }
}