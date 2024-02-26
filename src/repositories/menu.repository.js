import { api } from 'boot/axios'
import axios from 'axios'
import { Loading, Notify } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

class MenuRepository {

  getMenuList () {
    return new Promise(async(resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedOutlet = localStorage.getItem("outlet")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const outlet = encrypt.decryptData(decryptedOutlet)
      const bearer = localStorage.getItem("bearer")
      const outlet = localStorage.getItem("outlet")
      api.get('outlet/' + outlet + '/menu', {
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

  getCategoryList () {
    return new Promise(async(resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedOutlet = localStorage.getItem("outlet")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const outlet = encrypt.decryptData(decryptedOutlet)
      const bearer = localStorage.getItem("bearer")
      const outlet = localStorage.getItem("outlet")
      api.get('partner/' + outlet + '/category', {
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

}

export default MenuRepository
