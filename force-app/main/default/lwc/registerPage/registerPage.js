import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import registerCitizen from '@salesforce/apex/CitizenController.registerCitizen';

export default class RegisterPage extends NavigationMixin(LightningElement) {

    fullName = '';
    email = '';
    phone = '';
    address = '';
    username = '';
    password = '';
    confirmPassword = '';

    successMessage = '';
    errorMessage = '';

    handleChange(event) {

        const field = event.target.dataset.field;
        this[field] = event.target.value;

    }

    async handleRegister() {

        this.successMessage = '';
        this.errorMessage = '';

        if (this.password !== this.confirmPassword) {

            this.errorMessage = 'Passwords do not match.';
            return;

        }

        try {

            const result = await registerCitizen({

                fullName: this.fullName,
                email: this.email,
                phone: this.phone,
                address: this.address,
                username: this.username,
                password: this.password

            });

            if (result === 'SUCCESS') {

                this.clearForm();

                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        name: 'Citizen_Login__c'
                    }
                });

            } else {

                this.errorMessage = result;

            }

        } catch (error) {

            this.errorMessage =
                error.body ? error.body.message : 'Registration Failed.';

        }

    }

    clearForm() {

        this.fullName = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.username = '';
        this.password = '';
        this.confirmPassword = '';

    }

}