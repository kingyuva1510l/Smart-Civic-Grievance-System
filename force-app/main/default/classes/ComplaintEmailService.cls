public without sharing class ComplaintEmailService {

    // =========================
    // Citizen Email
    // =========================
    public static void sendCitizenEmail(Id complaintId) {

        Complaint__c complaint = [
            SELECT Name,
                   Category__c,
                   Priority__c,
                   Status__c,
                   Address__c,
                   Description__c,
                   Citizen__r.Full_Name__c,
                   Citizen__r.Email__c
            FROM Complaint__c
            WHERE Id = :complaintId
        ];

        if (complaint.Citizen__r == null ||
            String.isBlank(complaint.Citizen__r.Email__c)) {

            System.debug('Citizen email is blank.');
            return;
        }

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

        mail.setToAddresses(new String[]{
            complaint.Citizen__r.Email__c
        });

        mail.setSubject(
            'Complaint Submitted Successfully - ' + complaint.Name
        );

        mail.setPlainTextBody(

            'Dear ' + complaint.Citizen__r.Full_Name__c + ',\n\n' +

            'Your complaint has been submitted successfully.\n\n' +

            'Complaint Number : ' + complaint.Name + '\n' +
            'Category : ' + complaint.Category__c + '\n' +
            'Priority : ' + complaint.Priority__c + '\n' +
            'Status : ' + complaint.Status__c + '\n' +
            'Location : ' + complaint.Address__c + '\n' +
            'Description : ' + complaint.Description__c + '\n\n' +

            'Use this Complaint Number to track your complaint.\n\n' +

            'Regards,\n' +
            'Smart Civic Complaint Portal'
        );

        Messaging.SendEmailResult[] results =
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});

        if(results[0].isSuccess()){

            System.debug('EMAIL SENT SUCCESSFULLY TO CITIZEN');

        }else{

            for(Messaging.SendEmailError err : results[0].getErrors()){

                System.debug('CITIZEN EMAIL ERROR : ' + err.getMessage());
                System.debug('STATUS CODE : ' + err.getStatusCode());

            }
        }
    }


    // =========================
    // Department Head Email
    // =========================
    public static void sendDepartmentHeadEmail(Id complaintId){

        Complaint__c complaint = [

            SELECT Name,
                   Category__c,
                   Priority__c,
                   Status__c,
                   Address__c,
                   Description__c,
                   Citizen__r.Full_Name__c,
                   Department__r.Name,
                   Department__r.Department_Head__r.Name,
                   Department__r.Department_Head__r.Email

            FROM Complaint__c

            WHERE Id = :complaintId

        ];

        if(complaint.Department__r == null){

            System.debug('Department is NULL');
            return;

        }

        if(complaint.Department__r.Department_Head__r == null){

            System.debug('Department Head is NULL');
            return;

        }

        if(String.isBlank(complaint.Department__r.Department_Head__r.Email)){

            System.debug('Department Head Email is NULL');
            return;

        }

        System.debug('Department Head Name : '
            + complaint.Department__r.Department_Head__r.Name);

        System.debug('Department Head Email : '
            + complaint.Department__r.Department_Head__r.Email);

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

        mail.setToAddresses(new String[]{
            complaint.Department__r.Department_Head__r.Email
        });

        mail.setSubject('Department Email Test');

        mail.setPlainTextBody(

            'Hello ' +
            complaint.Department__r.Department_Head__r.Name +
            ',\n\n' +

            'A new complaint has been submitted.\n\n' +

            'Complaint Number : ' + complaint.Name + '\n' +
            'Citizen : ' + complaint.Citizen__r.Full_Name__c + '\n' +
            'Category : ' + complaint.Category__c + '\n' +
            'Priority : ' + complaint.Priority__c + '\n' +
            'Address : ' + complaint.Address__c + '\n' +
            'Description : ' + complaint.Description__c

        );

        Messaging.SendEmailResult[] results =
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});

        if(results[0].isSuccess()){

            System.debug('EMAIL SENT SUCCESSFULLY TO DEPARTMENT HEAD');

        }else{

            System.debug('EMAIL FAILED');

            for(Messaging.SendEmailError err : results[0].getErrors()){

                System.debug('ERROR : ' + err.getMessage());
                System.debug('STATUS : ' + err.getStatusCode());

            }
        }

    }

}