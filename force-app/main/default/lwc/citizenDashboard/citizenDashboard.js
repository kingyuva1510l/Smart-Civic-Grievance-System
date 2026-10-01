import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CitizenDashboard extends NavigationMixin(LightningElement) {

    handleSubmitComplaint() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Submit_Complaint__c'
            }
        });

    }

    handleTrackComplaint() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Track_Complaint__c'
            }
        });

    }

    handleMyComplaints() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'My_Complaints__c'
            }
        });

    }

    handleLogout() {

        sessionStorage.clear();

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        });

    }

}