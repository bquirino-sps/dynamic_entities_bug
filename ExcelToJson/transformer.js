const XLSX = require("xlsx");
const fs = require('fs');

const excelToJSON = () => {
  const excel = XLSX.readFile(
    "C:/Users/erodriguez/Desktop/githubs/dynamic_entities_bug/ExcelToJson/catalogo_estudios.xlsx"
  );
    
  let nombreHoja = excel.SheetNames; // regresa un array
  let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

  const jDatos = [];
  for (let i = 0; i < datos.length; i++) {
    const dato = datos[i];
    jDatos.push({
      ...dato
    });
  }
  let jsonContent = JSON.stringify({add:jDatos},null,2);    
    fs.writeFile('C:/Users/erodriguez/Desktop/githubs/dynamic_entities_bug/Formater/catalogoEstudios.json', jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });
    
};


/* module.exports = {
    excelToJSON
} */

excelToJSON();