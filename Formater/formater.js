const fs = require('fs');
const data = require('./catalogoEstudios.json')
const {DATA_TO_PUSH_PATH} = require('../keys')

function formater(){    
    // stringify JSON Object
    let formaterData ={}
    let add = []
    for (let object of data.add){
        let dic ={}
        dic.canonicalName = object.CLAVE.trim();
        dic.synonyms = object.ESTUDIO.toLowerCase().split(',').map((synonym) => limpiador(synonym.trim()).trim()).filter((synonym)=> synonym != "")
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

function  limpiador(cadena) {
    cadena = cadena.toLowerCase();

    // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi, "a");
    cadena = cadena.replace(/é/gi, "e");
    cadena = cadena.replace(/í/gi, "i");
    cadena = cadena.replace(/ó/gi, "o");
    cadena = cadena.replace(/ú/gi, "u");
    cadena = cadena.replace(/à/gi, "a");
    cadena = cadena.replace(/è/gi, "e");
    cadena = cadena.replace(/ì/gi, "i");
    cadena = cadena.replace(/ò/gi, "o");
    cadena = cadena.replace(/ù/gi, "u");
    //cadena = cadena.replace(/ñ/gi, "n");

    
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.¿¡";
    
    for (var i = 0; i < specialChars.length; i++) {
        cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    return cadena
}


formater();
//exports.formater = formater;