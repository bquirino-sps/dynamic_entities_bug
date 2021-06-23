const fs = require('fs');
const data = require('./catalogoEstudios.json')
const {DATA_TO_PUSH_PATH} = require('../keys')

function formater(){    
    // stringify JSON Object
    let formaterData ={}
    let add = []
    for (let object of data.add){
        let dic ={}
        dic.canonicalName = object.CLAVE
        dic.synonyms = object.ESTUDIO.toLowerCase().split(',')
        dic.nativeLanguageTag= "es"
        add.push(dic)
    }
    formaterData.add = add;

    var jsonContent = JSON.stringify(formaterData,null,2);
    //console.log(jsonContent);
    
    fs.writeFile(DATA_TO_PUSH_PATH, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });
}


formater();