import { LightningElement, track } from 'lwc';
import { OmniscriptBaseMixin } from 'c/omniscriptBaseMixin';

export default class LwctestBaseMixin extends OmniscriptBaseMixin(LightningElement) {
    mapMarkers = [
        {
            location: {
                City: 'San Francisco',
                Country: 'USA',
                PostalCode: '94105',
                State: 'CA',
                Street: '50 Fremont St',
            },
            value: 'SF1',
            icon: 'standard:account',
            title: 'Julies Kitchen',
            description: 'This is a long description',
        },
        {
            location: {
                City: 'San Francisco',
                Country: 'USA',
                PostalCode: '94105',
                State: 'CA',
                Street: '30 Fremont St.',
            },
            value: 'SF2',
            icon: 'standard:account',
            title: 'Tender Greens',
        },
    ];

    @track selectedMarkerValue = 'SF1';

    handleMarkerSelect(event) {
        // Get the selected marker value from the event detail
        const selectedValue = event.detail.selectedMarkerValue;
        if (selectedValue) {
            this.selectedMarkerValue = selectedValue;

            let selectedMapValue = {
                test1: "test2"
            };

            // Check the selected marker value and update the data accordingly
            if (this.selectedMarkerValue === 'SF2') {
                this.omniUpdateDataJson(selectedMapValue);
            }
        }
    }
}