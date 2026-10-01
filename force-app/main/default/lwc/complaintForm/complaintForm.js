import { LightningElement, track } from 'lwc';
import getWards from '@salesforce/apex/ComplaintController.getWards';
import createComplaint from '@salesforce/apex/ComplaintController.createComplaint';

export default class ComplaintForm extends LightningElement {

    title;
    description;
    address;
    category;
    priority;
    ward;

    @track wardOptions = [];

    categoryOptions = [
        { label: 'Water', value: 'Water' },
        { label: 'Road', value: 'Road' },
        { label: 'Electricity', value: 'Electricity' },
        { label: 'Sanitation', value: 'Sanitation' },
        { label: 'Others', value: 'Others' }
    ];

    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
    ];

    connectedCallback() {
        this.loadWards();
    }

    loadWards() {

        getWards()
        .then(result => {

            console.log('Wards from Apex:', result);

            this.wardOptions = result.map(record => {
                return {
                    label: record.Name,
                    value: record.Id
                };
            });

        })
        .catch(error => {
            console.error('Error loading wards', error);
        });

    }

    handleTitle(event){
        this.title = event.target.value;
    }

    handleDescription(event){
        this.description = event.target.value;
    }

    handleAddress(event){
        this.address = event.target.value;
    }

    handleCategory(event){
        this.category = event.target.value;
    }

    handlePriority(event){
        this.priority = event.target.value;
    }

    handleWard(event){
        this.ward = event.detail.value;
    }

    submitComplaint(){

        createComplaint({
            title: this.title,
            description: this.description,
            address: this.address,
            category: this.category,
            priority: this.priority,
            wardId: this.ward
        })

        .then(() => {

            alert('Complaint Submitted Successfully');

            this.title = '';
            this.description = '';
            this.address = '';
            this.category = '';
            this.priority = '';
            this.ward = '';

        })

        .catch(error => {

            console.error('Error submitting complaint', error);
            alert('Complaint submission failed');

        });

    }

}