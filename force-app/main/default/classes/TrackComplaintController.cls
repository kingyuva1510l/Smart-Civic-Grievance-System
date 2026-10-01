public without sharing class TrackComplaintController {

    @AuraEnabled(cacheable=true)
    public static ComplaintWrapper getComplaint(String complaintNumber){

        Complaint__c comp = [

            SELECT
                Name,
                Category__c,
                Priority__c,
                Status__c,
                Address__c,
                Description__c,
                Resolution_Deadline__c,
                Department__r.Name,
                Assigned_Officer__r.Name

            FROM Complaint__c

            WHERE Name = :complaintNumber

            LIMIT 1

        ];

        ComplaintWrapper wrapper = new ComplaintWrapper();

        wrapper.complaintNumber = comp.Name;
        wrapper.category = comp.Category__c;
        wrapper.priority = comp.Priority__c;
        wrapper.status = comp.Status__c;
        wrapper.address = comp.Address__c;
        wrapper.description = comp.Description__c;
        wrapper.resolutionDeadline = String.valueOf(comp.Resolution_Deadline__c);

        wrapper.departmentName =
            comp.Department__r != null ? comp.Department__r.Name : '';

        wrapper.officerName =
            comp.Assigned_Officer__r != null ? comp.Assigned_Officer__r.Name : '';

        return wrapper;

    }

    public class ComplaintWrapper {

        @AuraEnabled public String complaintNumber;
        @AuraEnabled public String category;
        @AuraEnabled public String priority;
        @AuraEnabled public String status;
        @AuraEnabled public String address;
        @AuraEnabled public String description;
        @AuraEnabled public String resolutionDeadline;
        @AuraEnabled public String departmentName;
        @AuraEnabled public String officerName;

    }

}