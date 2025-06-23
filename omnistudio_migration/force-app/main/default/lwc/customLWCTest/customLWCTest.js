import { LightningElement } from 'lwc';
import omniscriptDate from 'c/omniscriptDate';

export default class CustomLWCTest extends omniscriptDate {
    setElementFormattedValue() { 
        this._dateFormat='YYYY/DD/MM';
        window.alert("event triggered");
      }
}