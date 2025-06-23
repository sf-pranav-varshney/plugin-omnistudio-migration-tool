import { LightningElement, api, track } from 'lwc';

export default class MyComponent extends LightningElement {
    @api someInput; // Input variable from Omniscript
    @track outputMessage; // To hold output message

    handleClick() {
        this.outputMessage = 'Button was clicked!';
        alert(this.outputMessage);
        // Use this outputMessage to send data back to Omniscript if needed
        const outputEvent = new CustomEvent('output', {
            detail: { message: this.outputMessage },
        });
        this.dispatchEvent(outputEvent);
    }
}