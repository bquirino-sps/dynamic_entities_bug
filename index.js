const {createPushRequest} = require('./function_request/createPushRequest');
const {pushDataToRequest} = require('./function_request/pushDataToRequest');
const {finallyPushRequest} = require('./function_request/finallyPushRequest');

async function main(){
    createPushRequest()
    .then(pushRequestData =>{
        if(pushRequestData){
            let pushRequestId =  pushRequestData.id
            return pushRequestId
        }
        return false;
    })
    .then(async (pushRequestId)=>{
        if(pushRequestId){
            let data = await pushDataToRequest(pushRequestId)
            return data;
        }
        return false;
    })
    .then(async (status)=>{
        let result;
        if(status){
            result = await finallyPushRequest(status.pushRequestId,'DONE')
        }else{
            result = await finallyPushRequest(status.pushRequestId,'ABORT')
        }
        return result;
    })
    .then(response =>{
        console.log('response',response);
        return true;
    })
    .catch(e=>{
        console.log(e)
    })
}

main();