@isTest
public class MultiSelectMultiObjectLookupTest {
    @testSetup static void setup() {
        // Create common test accounts
        List<Account> testAccts = new List<Account>();
        for(Integer i=0;i<2;i++) {
            testAccts.add(new Account(Name = 'TestAcct'+i));
        }
        // Create test data
        Account acc = new Account(Name = 'Test Account');
        testAccts.add(acc);
        insert testAccts;   
        
    }
    
    
    @isTest static void getResultsTest() {
        // Get the first test account by using a SOQL query
        Account acct = [SELECT Id FROM Account WHERE Name='TestAcct0' LIMIT 1];
        // Modify first account
        acct.Phone = '555-1212';
        // This update is local to this test method only.
        update acct;
        Account acct2 = [SELECT Id FROM Account WHERE Name='TestAcct1' LIMIT 1];
        String ObjectName='Account';
        String fieldName='Name'; 
        String value='TestAcct';
        List<String> selectedRecId = null; 
            Boolean useFilterCriteria = true; 
        String filterField = 'Name'; 
        String filterFieldValue = 'TestAcct2';
        // Perform some testing
        test.startTest();
        List<MultiSelectMultiObjectLookupController.SObJectResult> result = MultiSelectMultiObjectLookupController.getResults(ObjectName, fieldName, value, selectedRecId, useFilterCriteria, filterField, filterFieldValue);
        test.stopTest();
        
    }
    
    @isTest static void getResultsTest2() {
        // Get the first test account by using a SOQL query
        Account acct = [SELECT Id FROM Account WHERE Name='TestAcct0' LIMIT 1];
        // Modify first account
        acct.Phone = '555-1212';
        // This update is local to this test method only.
        update acct;
        Account acct2 = [SELECT Id FROM Account WHERE Name='TestAcct1' LIMIT 1];
        String ObjectName='Account';
        String fieldName='Name'; 
        String value='Test Account';
        List<String> selectedRecId = null; 
            Boolean useFilterCriteria = false; 
        String filterField = 'Name'; 
        String filterFieldValue = 'TestAcct2';
        // Perform some testing
        test.startTest();
        List<MultiSelectMultiObjectLookupController.SObJectResult> result = MultiSelectMultiObjectLookupController.getResults(ObjectName, fieldName, value, selectedRecId, useFilterCriteria, filterField, filterFieldValue);
        test.stopTest();
        
    }
    
    
    
    @isTest
    static void testConstructorOne() {
        Account acc = [SELECT Id, Name FROM Account LIMIT 1];
        MultiSelectMultiObjectLookupController.SObjectResult sobjResult = new MultiSelectMultiObjectLookupController.SObjectResult('Test Account', acc.Id);
        System.assertEquals('Test Account', sobjResult.recName);
        System.assertEquals(acc.Id, sobjResult.recId);
    }
    
    @isTest
    static void testConstructorTwo() {
        Account acc = [SELECT Id, Name FROM Account LIMIT 1];
        MultiSelectMultiObjectLookupController.SObjectResult sobjResult = new MultiSelectMultiObjectLookupController.SObjectResult();
        System.assertEquals(null, sobjResult.recName);
        System.assertEquals(null, sobjResult.recId);
    }
}