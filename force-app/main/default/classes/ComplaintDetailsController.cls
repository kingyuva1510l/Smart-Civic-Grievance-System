public with sharing class ComplaintDetailsController {

    @AuraEnabled(cacheable=true)
    public static Complaint__c getComplaintDetails(Id complaintId){

        return [

            SELECT
                Id,
                Name,
                Category__c,
                Priority__c,
                Status__c,
                Description__c,
                Address__c,
                Department__r.Name,
                Assigned_Officer__r.Name,
                Resolution_Deadline__c,
                CreatedDate

            FROM Complaint__c

            WHERE Id = :complaintId

            LIMIT 1

        ];

    }

}