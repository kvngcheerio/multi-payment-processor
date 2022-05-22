const axios = require('axios');
const {extractResponseBody, } = require('./helpers')


const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const makeUrlCallWithoutData = async (callObject) => {
    const { callUrl, callMethod, callHeaders, callParams } = callObject

    if (!callUrl) {
      throw 'invalid Url'
    }
    if(!callMethod) {
      throw 'invalid method'
    }
    
    const args = {
        method: callMethod.toLowerCase(),
        headers: {...HEADERS, ...callHeaders},
    };

    let requestBody = await axios[args.method](callUrl, {headers:args.headers}).then((response) => { return response.data}).catch((err)=> {console.log(err, 'url call error')});
    if (Object.keys(requestBody).length) {
      return requestBody;
    }
    
  }

  const makeUrlCallWithData = async (callObject) => {
    const { callUrl, callMethod, callHeaders, callRequest } = callObject

    if (!callUrl) {
      throw 'invalid Url'
    }
    if(!callMethod) {
      throw 'invalid method'
    }

    if(!callRequest) {
      throw 'invalid body'
    }
    
    const args = {
        method: callMethod.toLowerCase(),
        headers: {...HEADERS, ...callHeaders},
    };

    let requestBody = await axios[args.method](callUrl, callRequest, {headers:args.headers}).then((response) => { return response.data}).catch((err)=> {console.log(err, 'url call error')});
    if (Object.keys(requestBody).length) {
      return requestBody;
    }
    
  }

  module.exports = {
      makeUrlCallWithData,
      makeUrlCallWithoutData,
  }