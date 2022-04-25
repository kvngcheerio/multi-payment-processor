
const generateReference = async(length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const generateSlug = async(data) => {
    return data.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

module.exports = {
    generateReference,
    generateSlug,
}