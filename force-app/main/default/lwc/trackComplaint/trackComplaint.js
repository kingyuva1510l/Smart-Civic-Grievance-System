import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getComplaint from '@salesforce/apex/TrackComplaintController.getComplaint';

export default class TrackComplaint extends NavigationMixin(LightningElement) {

    complaintNumber = '';

    complaint = null;

    errorMessage = '';

    handleChange(event) {

        this.complaintNumber = event.target.value;

    }

    async handleSearch() {

        this.errorMessage = '';
        this.complaint = null;

        try {

            const result = await getComplaint({

                complaintNumber: this.complaintNumber

            });

            this.complaint = result;

        }
        catch (error) {

            this.errorMessage =
                error.body
                    ? error.body.message
                    : 'Complaint not found.';

        }

    }

    handleBack() {

        this[NavigationMixin.Navigate]({

            type: 'comm__namedPage',
            attributes: {
                name: 'Citizen_Dashboard__c'
            }

        });

    }

}