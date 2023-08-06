import StatusMeter from "./statusMeter.js";

export default class StatusBur {
    constructor({ width, height }) {
        this.container = document.getElementById('status-bar-container');
        this.container.style.width = `${width}px`;
        this.container.style.height = `15%`;
        this.healthMeter = new StatusMeter({ width, height, labelText: "Health" });
        this.staminaMeter = new StatusMeter({ width, height, labelText: "Stamina" })

        this.container.appendChild(this.healthMeter.container);
        this.container.appendChild(this.staminaMeter.container);
    }

    resize({ width, height }) {
        this.container.style.width = `${width}px`;
        this.container.style.height = `15%`;
        this.healthMeter.resize({width, height});
        this.staminaMeter.resize({width, height});
    }

    update({ width, height }) {
        
    }
}