export default class StatusMeter {
    constructor({ labelText }) {
        this.container = document.createElement('div');
        this.container.setAttribute('id', `${labelText.toLowerCase()}-status-container`);
        this.container.classList.add('status-meter-container');
        this.label = document.createElement('div');
        this.label.classList.add('status-meter-label');
        this.label.innerText = labelText;
        this.meterWrapper = document.createElement('div');
        this.meterWrapper.classList.add('status-meter-wrapper');
        this.meter = document.createElement('div');
        this.meter.classList.add('status-meter');
        this.meter.setAttribute('id', `${labelText.toLowerCase()}-status-meter`);
        this.meterFill = document.createElement('div');
        this.meterFill.classList.add('status-meter-fill');
        this.meterFill.setAttribute('id', `${labelText.toLowerCase()}-meter-fill`);
        this.meterFill.style.backgroundColor = 'lightgreen';
        this.container.appendChild(this.label);
        this.container.appendChild(this.meterWrapper);
        this.meterWrapper.appendChild(this.meter);
        this.meter.appendChild(this.meterFill);
    }

    resize() {
        this.label.style.fontSize = `${this.label.offsetHeight}px`;
        this.meterWrapperHeight = this.meterWrapper.offsetHeight;
        this.meterHeight = this.meter.offsetHeight;
        this.meter.style.marginTop = `${(this.meterWrapperHeight / 2) - (this.meterHeight / 2)}px`;
    }

    updateMeterFill({ value, maxValue }) {
        const percentage = (value / maxValue) * 100;
        this.meterFill.style.width = `${percentage}%`;
        if (percentage < 25) {
            this.meterFill.style.backgroundColor = 'red';
        } else if (percentage < 50) {
            this.meterFill.style.backgroundColor = 'orange';
        } else {
            this.meterFill.style.backgroundColor = 'lightgreen';
        }
    }
}