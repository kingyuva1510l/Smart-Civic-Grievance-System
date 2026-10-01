import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import loginCitizen from '@salesforce/apex/CitizenLoginController.loginCitizen';

export default class LoginPage extends NavigationMixin(LightningElement) {

    username = '';
    password = '';

    successMessage = '';
    errorMessage = '';

    handleChange(event) {

        const field = event.target.dataset.field;
        this[field] = event.target.value;

    }

    async handleLogin() {

        this.successMessage = '';
        this.errorMessage = '';

        try {

            const result = await loginCitizen({

                username: this.username,
                password: this.password

            });

            if (result !== 'INVALID') {

                sessionStorage.setItem('citizenId', result);

                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        name: 'Citizen_Dashboard__c'
                    }
                });

            } else {

                this.errorMessage = 'Invalid Username or Password.';

            }

        } catch (error) {

            this.errorMessage =
                error.body
                    ? error.body.message
                    : 'Login Failed.';

        }

    }

}