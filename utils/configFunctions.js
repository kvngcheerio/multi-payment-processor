const axios = require('axios');
const {extractResponseBody, } = require('./helpers')


const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const makeUrlCall = async (callObject) => {
    const { callUrl, callMethod, callHeaders, callRequest } = callObject

    if (!callUrl) {
      throw 'invalid Url'
    }
    if(!callMethod) {
      throw 'invalid method'
    }
    
    const args = {
        method: METHODS[callMethod.toLowerCase()],
        headers: {...HEADERS, ...callHeaders},
    };

    let requestBody = await axios[args.method](callUrl, {headers:args.headers}, callRequest).then((response) => { return response.data}).catch((err)=> {throw err});
    if (Object.keys(requestBody).length) {
        endpointResponse = await extractResponseBody(response);
    }
    return endpointResponse;
  }

  module.exports = {
      makeUrlCall
  }