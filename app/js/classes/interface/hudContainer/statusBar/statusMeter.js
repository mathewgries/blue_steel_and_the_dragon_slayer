export default class StatusMeter {
    constructor({ labelText }) {
        this.container = this.buildContainer({ text: labelText });
        this.label = this.buildLabel({ text: labelText });
        this.meterWrapper = this.buildMeterWrapper({ text: labelText });
        this.meter = this.buildMeter({ text: labelText });

        this.container.appendChild(this.label);
        this.container.appendChild(this.meterWrapper);
        this.meterWrapper.appendChild(this.meter);
    }

    buildContainer({ text }) {
        const container = document.createElement('div');
        container.setAttribute('id', `${text.toLowerCase()}-status-container`);
        container.classList.add('status-meter-container');
        return container;
    }

    buildLabel({ text }) {
        const label = document.createElement('div');
        label.classList.add('status-meter-label');
        label.innerText = text;
        return label;
    }

    buildMeterWrapper({ text }) {
        const meterWrapper = document.createElement('div');
        meterWrapper.classList.add('status-meter-wrapper');
        return meterWrapper;
    }

    buildMeter({ text }) {
        const meter = document.createElement('div');
        meter.classList.add('status-meter');
        meter.setAttribute('id', `${text.toLowerCase()}-status-meter`);
        const meterFill = document.createElement('div');
        meterFill.classList.add('status-meter-fill');
        meterFill.setAttribute('id', `${text.toLowerCase()}-meter-fill`);
        meterFill.style.backgroundColor = 'lightgreen';
        meter.appendChild(meterFill);
        return meter;
    }

    resize() {
        this.label.style.fontSize = `${this.label.offsetHeight}px`;
        this.meterWrapperHeight = this.meterWrapper.offsetHeight;
        this.meterHeight = this.meter.offsetHeight;
        this.meter.style.marginTop = `${(this.meterWrapperHeight / 2) - (this.meterHeight / 2)}px`;
    }
}