import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import submitComplaint from '@salesforce/apex/ComplaintController.submitComplaint';

export default class SubmitComplaint extends NavigationMixin(LightningElement) {

    issueType = '';
    location = '';
    priority = '';
    description = '';

    successMessage = '';
    errorMessage = '';

    issueOptions = [
        { label: 'Road', value: 'Road' },
        { label: 'Water', value: 'Water' },
        { label: 'Electricity', value: 'Electricity' },
        { label: 'Sanitation', value: 'Sanitation' },
        { label: 'Others', value: 'Others' }
    ];

    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
        { label: 'Critical', value: 'Critical' }
    ];

    connectedCallback() {

        console.log('Issue Options:', JSON.stringify(this.issueOptions));
        console.log('Priority Options:', JSON.stringify(this.priorityOptions));

    }

    handleChange(event) {

        const field = event.target.dataset.field;
        this[field] = event.target.value;

    }

    async handleSubmit() {

        this.successMessage = '';
        this.errorMessage = '';

        const citizenId = sessionStorage.getItem('citizenId');

        if (!citizenId) {

            this.errorMessage = 'Please login again.';
            return;

        }

        try {

            const result = await submitComplaint({

                issueType: this.issueType,
                location: this.location,
                priority: this.priority,
                description: this.description,
                citizenId: citizenId

            });

            console.log('Apex Result:', result);

            if (result === 'SUCCESS') {

                this.clearForm();

                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        name: 'Citizen_Dashboard__c'
                    }
                });

            } else {

                this.errorMessage = result;

            }

        }
        catch (error) {

            console.error('Full Error:', error);

            if (error.body) {

                console.error('Apex Error:', error.body.message);

                this.errorMessage = error.body.message;

            } else {

                console.error('Unknown Error:', JSON.stringify(error));

                this.errorMessage = JSON.stringify(error);

            }

        }

    }

    clearForm() {

        this.issueType = '';
        this.location = '';
        this.priority = '';
        this.description = '';

        this.template.querySelectorAll(
            'lightning-input, lightning-combobox, lightning-textarea'
        ).forEach(field => {
            field.value = '';
        });

    }

}