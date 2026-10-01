public without sharing class MyComplaintsController {

    @AuraEnabled(cacheable=true)
    public static List<Complaint__c> getMyComplaints(Id citizenId){

        return [

            SELECT
                Id,
                Name,
                Category__c,
                Priority__c,
                Status__c,
                CreatedDate

            FROM Complaint__c

            WHERE Citizen__c = :citizenId

            ORDER BY CreatedDate DESC

        ];

    }

}