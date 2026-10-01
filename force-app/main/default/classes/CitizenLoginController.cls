public without sharing class CitizenLoginController {

    @AuraEnabled
    public static String loginCitizen(String username, String password) {

        System.debug('Entered Username: [' + username + ']');
        System.debug('Entered Password: [' + password + ']');

        List<Citizen__c> citizens = [
            SELECT Id, Username__c, Password__c
            FROM Citizen__c
            WITH SYSTEM_MODE
        ];

        for (Citizen__c c : citizens) {

            System.debug(
                'DB Username=[' + c.Username__c +
                '] Password=[' + c.Password__c + ']'
            );

            if (c.Username__c == username &&
                c.Password__c == password) {

                return c.Id;
            }
        }

        throw new AuraHandledException('No matching record found.');
    }
}