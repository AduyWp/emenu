import { api } from 'boot/axios'
import axios from 'axios'
import { Loading, Notify } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

class StorePaymentRepository {
  QRnobu (amount, validTime) {
    return new Promise((resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedOutletId = localStorage.getItem("outlet_id")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const outlet_id = encrypt.decryptData(decryptedOutletId)
      const bearer = localStorage.getItem("bearer")
      const outlet_id = localStorage.getItem("outlet_id")
      const data = {
        amount: amount,
        validTime: validTime
      }
      api.get('partner/' + outlet_id + '/generate_qr', {
        headers: {
          Authorization: 'Bearer ' + bearer
        },
        params: data
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

export default StorePaymentRepository
