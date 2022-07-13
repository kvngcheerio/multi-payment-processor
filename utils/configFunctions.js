const axios = require('axios');
const {extractResponseBody, } = require('./helpers')


const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const makeUrlCallWithoutData = async (callObject) => {
    const { callUrl, callMethod, callHeaders} = callObject

    if (!callUrl) {
      throw 'Call Url is Invalid'
    }
    if(!callMethod) {
      throw 'Call Method is Invalid'
    }
    
    const args = {
        method: callMethod.toLowerCase(),
        headers: {...HEADERS, ...callHeaders},
    };

    let requestBody = await axios[args.method](callUrl, {headers:args.headers}).then((response) => { return response.data}).catch((err)=> {throw `Request Call Error - ${err}`});
    if (Object.keys(requestBody).length) {
      return requestBody;
    }
    
  }

  const makeUrlCallWithData = async (callObject) => {
    const { callUrl, callMethod, callHeaders, callRequest } = callObject

    if (!callUrl) {
      throw 'Call Url is Invalid'
    }
    if(!callMethod) {
      throw 'Call Method is Invalid'
    }

    if(!callRequest) {
      throw 'Call Request Body is Invalid'
    }
    
    const args = {
        method: callMethod.toLowerCase(),
        headers: {...HEADERS, ...callHeaders},
    };

    let requestBody = await axios[args.method](callUrl, callRequest, {headers:args.headers}).then((response) => { return response.data}).catch((err)=> {throw `Request Call Error - ${err}`});
    if (Object.keys(requestBody).length) {
      return requestBody;
    }
    
  }

  module.exports = {
      makeUrlCallWithData,
      makeUrlCallWithoutData,
  }