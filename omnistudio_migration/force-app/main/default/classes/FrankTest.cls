@isTest
public class FrankTest {

    @isTest
    public static void whatever() {
		User u = [SELECT Id FROM User WHERE UserName='vreddystduser@vlocity.com'];

			String packageId = '033o00000009Pyt';
			 System.debug('isCurrentUser Admin LicensedForPackage for 033o00000009Pyt:' + UserInfo.isCurrentUserLicensedForPackage(packageId));

			System.runAs(u) {
              // The following code runs as user 'u'
              System.debug('Current User: ' + UserInfo.getUserName());
              System.debug('Current Profile: ' + UserInfo.getProfileId());
                
              String namespace = 'vlocity_ins';
			  System.debug(UserInfo.isCurrentUserLicensed(namespace));
                
			packageId = '033o00000009Pyt';
			 System.debug('isCurrentUserLicensedForPackage for 033o00000009Pyt:' + UserInfo.isCurrentUserLicensedForPackage(packageId));

          }
    }
}