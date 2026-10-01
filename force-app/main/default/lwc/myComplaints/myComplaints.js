import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getMyComplaints from '@salesforce/apex/MyComplaintsController.getMyComplaints';

const COLUMNS = [
    { label: 'Complaint No', fieldName: 'Name' },
    { label: 'Category', fieldName: 'Category__c' },
    { label: 'Priority', fieldName: 'Priority__c' },
    { label: 'Status', fieldName: 'Status__c' },
    {
        label: 'Created Date',
        fieldName: 'CreatedDate',
        type: 'date',
        typeAttributes: {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }
    }
];

export default class MyComplaints extends NavigationMixin(LightningElement) {

    complaints = [];
    columns = COLUMNS;

    errorMessage = '';
    loading = true;

    connectedCallback() {

        this.loadComplaints();

    }

    async loadComplaints() {

        const citizenId = sessionStorage.getItem('citizenId');

        if (!citizenId) {

            this.loading = false;
            this.errorMessage = 'Please login again.';
            return;

        }

        try {

            this.complaints = await getMyComplaints({

                citizenId: citizenId

            });

        } catch (error) {

            this.errorMessage =
                error.body
                    ? error.body.message
                    : 'Unable to load complaints.';

        } finally {

            this.loading = false;

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