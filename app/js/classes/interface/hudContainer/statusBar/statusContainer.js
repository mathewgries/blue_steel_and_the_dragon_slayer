import StatusMeter from "./statusMeter.js";

export default class StatusContainer {
    constructor() {
        this.container = this.buildContainer();
        this.healthMeter = this.buildHealthMeter();
        this.staminaMeter = this.buildStaminaMeter();

        this.container.appendChild(this.healthMeter.container);
        this.container.appendChild(this.staminaMeter.container);
    }

    buildContainer() {
        return document.getElementById('status-container');
    }

    buildHealthMeter() {
        return new StatusMeter({ labelText: "Health" });
    }

    buildStaminaMeter() {
        return this.staminaMeter = new StatusMeter({ labelText: "Stamina" });
    }

    resize() {
        this.healthMeter.resize();
        this.staminaMeter.resize();
    }
}