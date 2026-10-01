public with sharing class CitizenController {

    @AuraEnabled
    public static String registerCitizen(
        String fullName,
        String email,
        String phone,
        String address,
        String username,
        String password
    ) {

        try{

            Citizen__c citizen = new Citizen__c();

            citizen.Full_Name__c = fullName;
            citizen.Email__c = email;
            citizen.Phone__c = phone;
            citizen.Address__c = address;
            citizen.Username__c = username;
            citizen.Password__c = password;

            SObjectAccessDecision decision =
                Security.stripInaccessible(
                    AccessType.CREATABLE,
                    new List<SObject>{ citizen }
                );

            System.debug(decision.getRemovedFields());

            insert decision.getRecords();

            return 'SUCCESS';

        }catch(Exception e){

            throw new AuraHandledException(
                e.getMessage() +
                ' Line=' +
                e.getLineNumber()
            );

        }

    }

}