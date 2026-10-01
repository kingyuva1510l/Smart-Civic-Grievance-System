public without sharing class ComplaintController {

    @AuraEnabled
    public static String submitComplaint(
        String issueType,
        String location,
        String priority,
        String description,
        Id citizenId
    ) {

        try {

            Complaint__c complaint = new Complaint__c();

            complaint.Category__c = issueType;
            complaint.Address__c = location;
            complaint.Priority__c = priority;
            complaint.Description__c = description;
            complaint.Status__c = 'New';

            // Link complaint to logged-in citizen
            complaint.Citizen__c = citizenId;

            // Insert complaint
            insert complaint;

            // Send confirmation email to citizen
            try {
                ComplaintEmailService.sendCitizenEmail(complaint.Id);
                System.debug('Citizen email sent successfully.');
            } catch (Exception ex) {
                System.debug('Citizen Email Error: ' + ex.getMessage());
                System.debug(ex.getStackTraceString());
            }

            // Send notification email to department head
            try {
                ComplaintEmailService.sendDepartmentHeadEmail(complaint.Id);
                System.debug('Department Head email sent successfully.');
            } catch (Exception ex) {
                System.debug('Department Email Error: ' + ex.getMessage());
                System.debug(ex.getStackTraceString());
            }

            return 'SUCCESS';

        }
        catch (Exception e) {

            throw new AuraHandledException(
                e.getMessage() + ' | Line : ' + e.getLineNumber()
            );

        }

    }

}