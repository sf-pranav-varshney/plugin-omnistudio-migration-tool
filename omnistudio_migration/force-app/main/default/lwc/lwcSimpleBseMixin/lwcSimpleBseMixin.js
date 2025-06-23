import { LightningElement, track } from 'lwc';
import { OmniscriptBaseMixin } from 'vlocity_ins/omniscriptBaseMixin';

export default class SimpleGreeting extends OmniscriptBaseMixin(LightningElement) {
    @track greetingMessage = 'Hello, World!';

    handleChangeGreeting() {
        this.greetingMessage = 'Hello, Salesforce!';
    }
}