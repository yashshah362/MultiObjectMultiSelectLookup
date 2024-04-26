/*
 * Class Name - MultiSelectMultiObjectLookupController
 * Description - Controller class for MultiSelectMultiObjectLookup lwc component
 * Created By - Yash Shah
 * Version 1 - September, 2023
 * */
public class MultiSelectMultiObjectLookupController {
/*
 * Method Name - getResults
 * Description - Method to fetch the set of records based on the selected object and search key
 * Note - Modify based on the business use case
 * */
    @AuraEnabled(cacheable=true)
    public static List<SObJectResult> getResults(String ObjectName, String fieldName, String value, List<String> selectedRecId, Boolean useFilterCriteria, String filterField, String filterFieldValue) {
        List<SObJectResult> sObjectResultList = new List<SObJectResult>();
        system.debug(fieldName+'-------------'+ObjectName+'---++----------'+value+'====='+selectedRecId);
        if(selectedRecId == null)
            selectedRecId = new List<String>();
        
        if(String.isNotEmpty(value)) {
            String query = 'Select Id,';
            //if this field is set to true then provide the correct filter field and filter field value 
            if(useFilterCriteria){
                query = query+ fieldName+' FROM '+ObjectName+' WHERE '+fieldName+' LIKE \'%' + value.trim() + '%\' and ID NOT IN: selectedRecId ';
                query = query+' and '+filterField+'= \''+filterFieldValue + '\' LIMIT 10';
                
            }else{ //otherwise fetch the set of records based on the search key
                query = query+ fieldName+' FROM '+ObjectName+' WHERE '+fieldName+' LIKE \'%' + value.trim() + '%\' and ID NOT IN: selectedRecId';
            }
            system.debug(query);
            String fieldvalue = '';
            for(sObject so : Database.Query(query)) {
                fieldvalue = (String)so.get(fieldName);
                sObjectResultList.add(new SObjectResult(fieldvalue, so.Id));                
            }
        }
        return sObjectResultList;
    }
    /*
 * Wrapper Class Name - SObjectResult class 
 * Description - SObjectResult class to return the necessary fields details on search
 * Note - Modify based on the business use case
 * */
    public class SObjectResult {
        @AuraEnabled
        public String recName;
        @AuraEnabled
        public Id recId;
        
        public SObJectResult(String recNameTemp, Id recIdTemp) {
            recName = recNameTemp;
            recId = recIdTemp;
        }
        public SObJectResult() {
            
        }
    }
}