import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class PortalHeader extends NavigationMixin(LightningElement) {

    handleHome() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
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

    handleServices() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        });

        setTimeout(() => {
            const section = document.getElementById('services');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);

    }

    handleAbout() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        });

        setTimeout(() => {
            const section = document.getElementById('about');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);

    }

    handleContact() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        });

        setTimeout(() => {
            const section = document.getElementById('contact');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);

    }

}