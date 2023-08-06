export default class StatusMeter {
    constructor({ width, height, labelText }) {
        this.container = document.createElement('div');
        this.container.setAttribute('id', 'status-meter-container')
        this.container.style.width = '100%';
        this.container.style.height = '50%';

        this.label = document.createElement('div');
        this.label.innerText = labelText;
        this.label.style.textAlign = 'center';
        this.label.style.width = '100%';
        this.label.style.height = '30%';

        this.meterContainer = document.createElement('div');
        this.meterContainer.style.width = '100%';
        this.meterContainer.style.height = '70%';

        this.meter = document.createElement('div')
        this.meter.style.border = '2px solid black';
        this.meter.style.width = '80%';
        this.meter.style.height = '25%';
        this.meter.style.margin = '0 auto';

        this.meterFill = document.createElement('div');
        this.meterFill.style.backgroundColor = 'green';
        this.meterFill.style.height = '100%';
        this.meterFill.style.width = '100%';
        this.meterFill.style.backgroundColor = 'lightgreen';

        this.container.appendChild(this.label)
        this.container.appendChild(this.meterContainer);
        this.meterContainer.appendChild(this.meter)
        this.meter.appendChild(this.meterFill)
    }

    resize({ width, height }) {
        this.container.style.width = '100%';
        this.container.style.height = '50%';
        this.label.style.width = '100%';
        this.label.style.height = '30%';
        this.meterContainer.style.width = '100%';
        this.meterContainer.style.height = '70%';
        this.meter.style.width = '80%';
        this.meter.style.height = '25%';
        this.meterFill.style.height = '100%';
        this.label.style.fontSize = `${this.label.offsetHeight}px`
        this.meterContainerHeight = this.meterContainer.offsetHeight;
        this.meterHeight = this.meter.offsetHeight
        this.meter.style.marginTop = `${(this.meterContainerHeight / 2) - (this.meterHeight / 2)}px`
    }

    updateMeterFill({ value, maxValue }) {
        const percentage = (value / maxValue) * 100;
        this.meterFill.style.width = `{percentage}%`
        if (percentage < 25) {
            this.meterFill.style.backgroundColor = 'red'
        } else if (percentage < 50) {
            this.meterFill.style.backgroundColor = 'orange'
        } else {
            this.meterFill.style.backgroundColor = 'lightgreen'
        }
    }

    update({ width, height }) {
        
    }
}