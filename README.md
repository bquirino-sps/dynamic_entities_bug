# DynamicEntities ODA

Lo que hace este script es tomar un archivo JSON con un formato definido para generar un nuevo archivo JSON ya preparado que contiene la DATA de los dynamic entities. Con este archivo hacemos una peticion a varias apis de ODA. Es importante mencionar que las variables en el archivo ```Keys.js``` deben de actualizarse según la instancia, la skill y la versión con la que se este trabajando en ODA. A su vez el archivo ```config``` que contiene las claves para usar las apis de ODA tambien deben de ajustarse.

# Para correr el script con exito seguir los pasos

1. Necesitamos convertir nuestro excel ```catalogo_estudios_formated_v2.xlsx``` a JSON haciendo uso de la herrramienta [EXCEL to JSON](https://beautifytools.com/excel-to-json-converter.php)
2. Una vez tengamos nuestro JSON debemos vaciar el contenido manualmente en ```/Formater/catalogoEstudios.json```
3. Ejecutar el script formater.js con el comando ```node ./Formater/formater.js```. Esto nos generara un archivo nuevo en la ruta ```/dataToPush/catalogoEstudios.json```
4. Ejecutar el comando ```node index.js```.
## Convertidores

[EXCEL to JSON](https://beautifytools.com/excel-to-json-converter.php)

[JSON to EXCEL](https://data.page/json/csv)