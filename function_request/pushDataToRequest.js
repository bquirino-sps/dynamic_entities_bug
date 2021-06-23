const common = require("oci-common");
const promise = require("es6-promise");
const { BOT_ID, ENTITY_ID, HOST, CONFIG_PATH} = require('../keys');
const dynamicEntitiesValues = require('../dynamicEntityData.json');

async function pushDataToRequest(pushRequestId){
    // 1. Create Request Signing instance
    require("isomorphic-fetch");
    promise.polyfill();
    
    const configurationFilePath = CONFIG_PATH;
    const configProfile = "DEFAULT";
    
    const provider = new common.ConfigFileAuthenticationDetailsProvider(
        configurationFilePath,
        configProfile
    );
    const signer = new common.DefaultRequestSigner(provider);
    console.log(dynamicEntitiesValues);
    const httpRequest = {
        uri: `https://${HOST}/api/v1/bots/${BOT_ID}/dynamicEntities/${ENTITY_ID}/pushRequests/${pushRequestId}/values`,
        headers: new Headers(),
        method: "PATCH",
        body: JSON.stringify(dynamicEntitiesValues)
    };
    // 3. sign request
 
    await signer.signHttpRequest(httpRequest);
    //console.log(httpRequest.headers)
 
    // 4. Make the call
    const response = await fetch(
        new Request(httpRequest.uri, {
        method: httpRequest.method,
        headers: httpRequest.headers,
        body: httpRequest.body
        })
    );
    // 5. Return response
    try{
        const data = await response.json()
        console.log('pushData',data);
        return data;
    }catch(error){
        console.log(error);
        return false;
    }
}

exports.pushDataToRequest = pushDataToRequest;