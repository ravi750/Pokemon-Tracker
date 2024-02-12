import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import POKEMON_NAME from '@salesforce/schema/Pokemon__c.Name';
//import POKE_LOCATION from '@salesforce/schema/Pokemon__c.Location__c';

const NAME = 'Pokemon__c.Name';
const LATITUDE = 'Pokemon__c.Location__Latitude__s';
const LONGITUDE = 'Pokemon__c.Location__Longitude__s';

const FIELDS = [NAME,LATITUDE,LONGITUDE];

export default class PokemonLocation extends LightningElement {

    @api recordId;

    titleCard;
    mapMarkers =[];

    @wire(getRecord, { recordId : '$recordId', fields:FIELDS })
    pokemons({error, data}){

        if(error){
            console.error('error== '+JSON.stringify(error));
        }
        else if(data){
            console.log('data== '+JSON.stringify(data));
            this.titleCard = getFieldValue(data,NAME);
            console.log('titleCard== '+this.titleCard);

            const latitude = getFieldValue(data,LATITUDE);
            const longitude = getFieldValue(data,LONGITUDE);

            this.mapMarkers = [{
                location: {latitude, longitude},
                title: this.titleCard,
                description: `coordinates : ${latitude}, ${longitude}`,
            }];

            console.log('mapMarkders== '+JSON.stringify(this.mapMarkers));
        }
    }
}