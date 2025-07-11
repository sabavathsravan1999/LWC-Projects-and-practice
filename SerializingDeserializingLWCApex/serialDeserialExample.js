import { LightningElement,wire} from 'lwc';
import fetchAccountContact from '@salesforce/apex/AccountContactfetchController.fetchAccountContact';
import LastName from '@salesforce/schema/Contact.LastName';
export default class SerialDeserialExample extends LightningElement {
    textEntred='';
    account;
    contacts=[];
    COLUMNS=[
        {label: 'First Name', fieldName:'FirstName'},
        {label: 'Last Name', fieldName:'LastName'},
        {label: 'Email', fieldName:'Email'}
    ];
    handlechange(event){
        this.textEntred=event.target.value;
    }
    handleclick(event){
        //get the data from the controlers and display it on the UI
        fetchAccountContact({accountName : this.textEntred})
            .then( result => {
                //deserialize the data 
                const parsedData=JSON.parse(result);
                this.account=parsedData.account;
                this.contacts=parsedData.contacts;
            })
            .catch(error => {
                console.log('this is the error ra chinna: ' + error);
            });
        
    }
    get accountDetails(){
        return this.account?true:false;
    }
    get contactDetails(){
        return this.contacts?this.contacts:'';
    }

}
