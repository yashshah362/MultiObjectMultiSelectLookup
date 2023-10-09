# MultiObjectMultiSelectLookup
The asset is a Lightning Web Component that has been customized to enable users to choose an object of their preference and search for its associated records, thereby permitting them to select multiple records from the chosen object.

Features : 
1. Choose objects from the dropdown list.
2. Pick multiple records from the currently selected object.


Steps to Install :
LWC Configuration :
1. This component can be invoked from Aura components or Lightning Web Components, or it can be utilized independently.
2. Input a list of objects into the array named "objectList" within the "MultiSelectMultiObjectLookup.js" file

	objectList = [
	  {
	    name: 'Account',
	    iconName: 'standard:account',
	    title: 'Account'
	  },
	  {
	    name: 'Lead',
	    iconName: 'standard:lead',
	    title: 'Lead'
	  }
   ];

4. To specify the default object name from the dropdown,use:

	@api objectName = 'Account'

5. To define the field name used for record searching, use:

	@api fieldName = 'Name';

6. Utilize this field useFilterCriteria to activate the records filter in SOQL query:

	@api useFilterCriteria = false;

7. Utilize this field to filter records using the "WHERE" clause:

	@api filterField = 'isActive';

8. Employ this field to set the label:

	@api Label = 'FIELD LABEL NAME';

9. Use this field to set the default icon name:

	@api iconName = 'standard:account'






