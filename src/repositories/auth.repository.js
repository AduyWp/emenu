import { api } from 'boot/axios'
import axios from 'axios'
import { Loading, Notify } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

class AuthRepository {

  getTadaToken () {
    return new Promise(async(resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedOutlet = localStorage.getItem("outlet")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const outlet = encrypt.decryptData(decryptedOutlet)
      const bearer = localStorage.getItem("bearer")
      const outlet = localStorage.getItem("outlet")
      api.get('partner/' + outlet + '/tada/accessToken', {
        headers: {
          Authorization: 'Bearer ' + bearer
        }
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  checkMember (phone, accessToken) {
    return new Promise(async(resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedOutlet = localStorage.getItem("outlet")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const outlet = encrypt.decryptData(decryptedOutlet)
      const bearer = localStorage.getItem("bearer")
      const outlet = localStorage.getItem("outlet")
      // set value
      api.get('/partner/'+ outlet + '/tada/checkMember', {
        headers: {
          Authorization: 'Bearer ' + bearer
        },
        params: {
          accessToken,
          phone
        }
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  tadaOtp (accessToken, phone, cardno) {
    return new Promise(async(resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedOutlet = localStorage.getItem("outlet")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const outlet = encrypt.decryptData(decryptedOutlet)
      const bearer = localStorage.getItem("bearer")
      const outlet = localStorage.getItem("outlet")
      // set value
      const headers = {
          Authorization: 'Bearer ' + bearer
      };
      const data = {
        accessToken: accessToken,
        phone: phone,
        cardNo: cardno
      }
      api.post('/partner/'+ outlet + '/tada/request_otp', data, {
        headers: headers
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  validateTadaOtp (accessToken, phone, cardno, pin) {
    return new Promise((resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedStore = localStorage.getItem("store")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const store = encrypt.decryptData(decryptedStore)
      const bearer = localStorage.getItem("bearer")
      const store = localStorage.getItem("store")
      const headers = {
          Authorization: 'Bearer ' + bearer
      };
      const data = {
        accessToken: accessToken,
        phone: phone,
        cardNo: cardno,
        pin: pin
      }
      api.post('/outlet/'+ store + '/tada/validate_otp', data, {
        headers: headers
      })
      .then(async(response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  registerMember (accessToken, phone, invoice, programId) {
    return new Promise((resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedStore = localStorage.getItem("store")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const store = encrypt.decryptData(decryptedStore)
      const bearer = localStorage.getItem("bearer")
      const store = localStorage.getItem("store")
      const headers = {
          Authorization: 'Bearer ' + bearer
      };
      const data = {
        accessToken: accessToken,
        phone: phone,
        invoice: invoice,
        program_id: programId,
      }
      api.post('/outlet/'+ store + '/tada/createMember', data, {
        headers: headers
      })
      .then(async(response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  sendRegisterMember (accessToken, cardId, name, email) {
    return new Promise((resolve, reject) => {
      // decrypted
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedOutlet = localStorage.getItem("outlet")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const outlet = encrypt.decryptData(decryptedOutlet)
      const bearer = localStorage.getItem("bearer")
      const outlet = localStorage.getItem("outlet")
      const headers = {
          Authorization: 'Bearer ' + bearer
      };
      const data = {
        accessToken: accessToken,
        card_id: cardId,
        name: name,
        email: email,
      }
      api.post('/partner/'+ outlet + '/tada/registerMember', data, {
        headers: headers
      })
      .then(async(response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}

export default AuthRepository
