const generateReference = async (length) => {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const generateSlug = async (data) => {
  return data
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}



const convertAmount = (amount) => parseFloat(amount) * 100;
const reduceAmount = (amount) => parseFloat(amount) / 100;

const extractResponseProperty = (property, parent) => {
  return !parent || !property ? undefined : parent[property];
}

const parseResponseValues = function (values, outResponse) {
  const newObject = {};
    Object.keys(outResponse)
      .map((response) => {
        if (!!values[response]) {
          newObject[outResponse[response]] = values[response];
        }
      });
  
    return newObject;
  };



module.exports = {
  generateReference,
  generateSlug,
  convertAmount,
  reduceAmount,
  extractResponseProperty,
  parseResponseValues,
}
