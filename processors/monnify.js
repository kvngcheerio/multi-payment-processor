const {
  monnifyBankUrl,
  monnifyApiKey,
  monnifyLoginUrl,
  monnifySecretKey,
} = require("../config/environment");
const { extractResponseProperty } = require("../utils/helpers");
const { makeApiCall, requestTypes } = require("../utils/configFunctions");
const { bankListResponse } = require("../config/response");

const loginCallHeaders = {
  Authorization: `Basic ${Buffer.from(
    `${monnifyApiKey}:${monnifySecretKey}`
  ).toString("base64")}`,
};

const callHeaders = async () => {
  const { accessToken } = await makeLoginCall();
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const extractStatus = (response) => ({
  status: extractResponseProperty("requestSuccessful", response),
  message: extractResponseProperty("responseMessage", response),
});

const makeLoginCall = async () => {
  try {
    const callObject = {
      url: monnifyLoginUrl,
      method: requestTypes.POST,
      headers: loginCallHeaders,
    };
    const loginCall = await makeApiCall(callObject);
    if (loginCall) {
      return {
        accessToken: loginCall.responseBody.accessToken,
      };
    }
  } catch (e) {
    throw e;
  }
};

//get bank list
const getMonnifyBankList = async () => {
  try {
    //make bank list call with makeurl util by passing in banklist url, method and authorization header
    const callObject = {
      url: monnifyBankUrl,
      callMethod: requestTypes.GET,
      headers: await callHeaders(),
    };

    const bankListCall = await makeApiCall(callObject);
    if (bankListCall) {
      const outResponse = {
        name: "bankName",
        code: "bankCode",
      };
      const bankList = await bankListResponse(
        bankListCall.responseBody,
        outResponse
      );
      return {
        ...extractStatus(bankListCall),
        banks: bankList,
      };
    } else {
      throw "invalid call";
    }
  } catch (err) {
    throw "Bank list error";
  }
};

module.exports = {
  getMonnifyBankList,
};
