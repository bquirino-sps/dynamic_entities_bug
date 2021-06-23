const {createPushRequest} = require('./function_request/createPushRequest');
const {pushDataToRequest} = require('./function_request/pushDataToRequest');
const {finallyPushRequest} = require('./function_request/finallyPushRequest');

async function main(){
    let pushRequestId;
    createPushRequest()
    .then(pushRequestData =>{
        if(pushRequestData.id){
            pushRequestId =  pushRequestData.id
            return pushRequestId
        }
        return false;
    })
    .then(async ()=>{
        if(pushRequestId){
            let data = await pushDataToRequest(pushRequestId)
            return data;
        }
        return false;
    })
    .then(async (status)=>{
        let result;
        if(status.pushRequestId){
            result = await finallyPushRequest(pushRequestId,'DONE')
        }else{
            result = await finallyPushRequest(pushRequestId,'ABORT')
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