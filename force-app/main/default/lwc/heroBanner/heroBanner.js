import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class HeroBanner extends NavigationMixin(LightningElement) {

    handleRegister() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Citizen_Register__c'
            }
        });

    }

    handleLogin() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Citizen_Login__c'
            }
        });

    }

}