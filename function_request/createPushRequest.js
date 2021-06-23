//Create push request
const common = require("oci-common");
const promise = require("es6-promise");
const { BOT_ID, ENTITY_ID, HOST, CONFIG_PATH} = require('../keys');

async function createPushRequest(){
    require("isomorphic-fetch");
    promise.polyfill();

    const configurationFilePath = CONFIG_PATH;
    const configProfile = "DEFAULT";

    const provider = new common.ConfigFileAuthenticationDetailsProvider(
    configurationFilePath,
    configProfile
    );
    
    const copy = false;
  // 1. Create Request Signing instance
    const signer = new common.DefaultRequestSigner(provider);

    // 2. Create HttpRequest to be signed
    const httpRequest = {
        uri: `https://${HOST}/api/v1/bots/${BOT_ID}/dynamicEntities/${ENTITY_ID}/pushRequests?copy=${copy}`,
        headers: new Headers(),
        method: "POST"
    };

    // 3. sign request
    await signer.signHttpRequest(httpRequest);
    //console.log(httpRequest.headers)
 
    //console.log(signer)
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
        console.log('pushRequest',data);
        return data;
    }catch(error){
        console.log(error);
        return false;
    }
}

exports.createPushRequest = createPushRequest;