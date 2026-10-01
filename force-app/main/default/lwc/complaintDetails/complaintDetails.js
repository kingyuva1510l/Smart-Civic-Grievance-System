import { LightningElement } from 'lwc';
import getComplaintDetails from '@salesforce/apex/ComplaintDetailsController.getComplaintDetails';

export default class ComplaintDetails extends LightningElement {

    complaint;
    errorMessage = '';

    connectedCallback() {

        const complaintId = sessionStorage.getItem('complaintId');

        if (!complaintId) {

            this.errorMessage = 'No complaint selected.';
            return;

        }

        this.loadComplaint(complaintId);

    }

    async loadComplaint(complaintId){

        try{

            this.complaint = await getComplaintDetails({
                complaintId: complaintId
            });

        }
        catch(error){

            this.errorMessage =
                error.body
                ? error.body.message
                : 'Unable to load complaint details.';

        }

    }

}