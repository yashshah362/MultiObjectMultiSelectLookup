import { LightningElement, track, api } from 'lwc';

import getResults from '@salesforce/apex/MultiSelectMultiObjectLookupController.getResults';

export default class MultiSelectMultiObjectLookup extends LightningElement {
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
    showObjectList = false;
    title;
    alternativeText;
    previousSelectedObject;

    @api objectName = 'Account';
    @api fieldName = 'Name';
    @api filterField = 'isActive'; //used to provide filter field in where clause
    @api filterFieldValue;//used to provide filter field value in where clause
    @api useFilterCriteria = false; // used to toggle the where clause in soql query
    @api singleSelection = false; // used to toggle between single select and multi select
    @track disableInputField = false;

    @api Label = 'FIELD LABEL NAME';

    @track searchRecords = [];
    @track selectedIds = [];
    @track selectedRecords=[];
    @api selectedFromParent = [];
    @api required = false;
    @api iconName = 'standard:account'
    @api LoadingText = false;
    @track dynamiClassname = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    @track messageFlag = false;
    @track showRecList;
    connectedCallback() {
        console.log('LookuoComponentinserted')
        console.log(this.selectedFromParent);
        if(this.selectedFromParent != undefined){
            this.selectedRecords = [...this.selectedFromParent];
            if(this.singleSelection){
                this.disableInputField = true;
            }
        }
    }
    searchField(event) {
        
        var currentText = event.target.value;
        var selectRecId = [];
        selectRecId = this.selectedRecords.map((x) => x.recId);


        this.LoadingText = true;
        this.useFilterCriteria = false;
        this.filterFieldValue = true;
        getResults({ ObjectName: this.objectName, fieldName: this.fieldName, value: currentText, selectedRecId : selectRecId, useFilterCriteria: this.useFilterCriteria, filterField: this.filterField, filterFieldValue:this.filterFieldValue})
        .then(result => {
            this.searchRecords= result;
            this.LoadingText = false;

            //
            this.dynamiClassname =  result.length > 0 ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            if(currentText.length > 0 && result.length == 0) {
                this.messageFlag = true;
            }
            else {
                this.messageFlag = false;
            }

            if(this.selectRecordId != null && this.selectRecordId.length > 0) {
                this.iconFlag = false;
                this.clearIconFlag = true;
            }
            else {
                this.iconFlag = true;
                this.clearIconFlag = false;
            }
        })
        .catch(error => {
            console.log('-------error-------------'+error);
            console.log(error);
        });

    }

   setSelectedRecord(event) {

        var recId = event.currentTarget.dataset.id;
        var selectName = event.currentTarget.dataset.name;
        console.log(recId);
        //console.log(selectName);
        let newsObject = { 'recId' : recId ,'recName' : selectName };
        this.selectedIds.push(recId);
        this.selectedRecords.push(newsObject);
        console.log(this.selectedIds);
        this.dynamiClassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        //let selRecords = this.selectedRecords;
        this.template.querySelectorAll('lightning-input').forEach(each => {
            each.value = '';
        });
        console.log('event dispatch');
        //console.log(this.selectedIds);
        let ids = this.selectedIds.toString();
        console.log(ids);
        if(this.ObjectName != this.previousSelectedObject) {
            ids = '';
        }
        const selectedEvent = new CustomEvent("selectedrecordsarray", { 
            detail: this.selectedRecords
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
        if(this.singleSelection){
            this.disableInputField = true;
        }
    }

    removeRecord (event){
        let selectRecId = [];
        let selectedIds1 = [];
        for(let i = 0; i < this.selectedRecords.length; i++){
            if(event.detail.name !== this.selectedRecords[i].recId){
                selectRecId.push(this.selectedRecords[i]);
                selectedIds1.push(this.selectedRecords[i].recId)
            }
        }
        this.selectedRecords = [...selectRecId];
        this.selectedIds = [...selectedIds1];
        let selRecords = this.selectedRecords;

        let ids = this.selectedIds.toString();
        if(this.singleSelection && selectRecId.length <=0){
            this.disableInputField = false;
        }
        const selectedEvent = new CustomEvent('selectedrecordsarray', { 
            detail: this.selectedRecords
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    showObjects(event){
        this.showObjectList = true;
    }
    selectObject(event){
        this.previousSelectedObject = this.objectName;
        this.showObjectList = false;
        this.objectName =  event.currentTarget.dataset.item;
        this.iconName =  event.currentTarget.dataset.icon;
        this.alternativeText = event.currentTarget.dataset.item;
        this.title = event.currentTarget.dataset.item;
        if(this.ObjectName != this.previousSelectedObject) {
            this.selectedRecords = [];
        }
        console.log('selectedRecords::' + this.selectedRecords)
    }
    blurObjectList(event){
        this.showObjectList = false;
    }
    @track inputClass = '';
    blurTimeout;
    selectedName;
    handleClick(event){
        this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.showRecList = true;
    }
    onBlur() {
        this.showRecList = false;
    }
}