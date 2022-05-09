import Localbase from 'localbase';
import QuesData from './questonsData/data'


export let db = new Localbase('db');
window.db = db;
db.config.debug = false;


export function insertData(){
    for(let i=0;i<15;i++){
        db.collection("450dsaArchive").add(QuesData[i] , QuesData[i].topicName);
    }
    
}

export function updateData( pageType ,  data){
     db.collection("450dsaArchive").doc({topicName : pageType}).update(data);
}

