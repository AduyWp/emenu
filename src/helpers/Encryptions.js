import CryptoJS from 'crypto-js';
const secretKey = '(8W:0K*)t(cxRk$P#4k:hrnexp[?_g';

class Encryptions {
  isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  encryptData(data) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
  }

  decryptData(encryptedData) {
    // const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    // let decryptedData
    // if (this.isJSON(decryptedBytes.toString(CryptoJS.enc.Utf8))) {
    //   decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    // } else {
    //   decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    // }
    // const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      
      if (!decryptedBytes) {
          console.error("Decryption failed: Unable to decrypt data.");
          return null;
      }

      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

      if (this.isJSON(decryptedData)) {
          return JSON.parse(decryptedData);
      } else {
          return decryptedData;
      }
    } catch (error) {
        console.error("Decryption failed:", error);
        return null; // or handle the error in an appropriate way
    }
  }
}

export default Encryptions
