import StatusMeter from "./statusMeter.js";

export default class StatusBur {
    constructor() {
        this.container = document.getElementById('status-bar-container');
        this.healthMeter = new StatusMeter({ labelText: "Health" });
        this.staminaMeter = new StatusMeter({ labelText: "Stamina" });
        this.container.appendChild(this.healthMeter.container);
        this.container.appendChild(this.staminaMeter.container);
    }

    resize() {
        this.healthMeter.resize();
        this.staminaMeter.resize();
    }
}