import { api } from 'boot/axios'
import axios from 'axios'
import { Loading, Notify } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

class StoreAuthRepository {
  getAccessToken () {
    return new Promise((resolve, reject) => {
      // decrypted
      // const decryptedStoreName = localStorage.getItem("storeName")
      // const decryptedOutlet = localStorage.getItem("outlet")
      // const decryptedNik = localStorage.getItem("nik")
      // const decryptedTableId = localStorage.getItem("table_id")
      // const decryptedUseAddress = localStorage.getItem("use_address")

      api.post('/emenu/login', {
        // storeName: encrypt.decryptData(decryptedStoreName),
        // app_id: 'DRDvs6SaIBx1zr5K9SbXoeuGd9bCnkI0'
        // outlet: encrypt.decryptData(decryptedOutlet),
        // nik: encrypt.decryptData(decryptedNik),
        // table_id: encrypt.decryptData(decryptedTableId),
        // use_address: encrypt.decryptData(decryptedUseAddress),
        storeName: localStorage.getItem("storeName"),
        outlet: localStorage.getItem("outlet"),
        nik: localStorage.getItem("nik"),
        table_id: localStorage.getItem("table_id"),
        use_address: localStorage.getItem("use_address"),
      })
      .then((response) => {
       resolve(response.data)
      })
      .catch((error) => {
       reject(error)
     })
    })
  }
  
  storeSetting () {
    return new Promise(async(resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedStore = localStorage.getItem("store")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const store = encrypt.decryptData(decryptedStore)
      const bearer = localStorage.getItem("bearer")
      const store = localStorage.getItem("store")
      api.get('/partner/setting/'+ store, {
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

  outletList () {
    return new Promise(async(resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedStore = localStorage.getItem("store_id")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const store_id = encrypt.decryptData(decryptedStore)
      const bearer = localStorage.getItem("bearer")
      const store_id = localStorage.getItem("store_id")
      api.get('/partner/outlet/available?', {
        headers: {
          Authorization: 'Bearer ' + bearer
        },

        params: {
          store_id: store_id 
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

  outletData () {
    return new Promise(async(resolve, reject) => {
      let outlet_id = null
      setTimeout(() => {
        // decrypted
        // const decryptedBearer = localStorage.getItem("bearer")
        // const decryptedOutletId = localStorage.getItem("outlet_id")
        // set value
        // const bearer = encrypt.decryptData(decryptedBearer)
        // outlet_id = encrypt.decryptData(decryptedOutletId)
        const bearer = localStorage.getItem("bearer")
        outlet_id = localStorage.getItem("outlet_id")
        api.get('/partner/outlet/' + outlet_id, {
          headers: {
            Authorization: 'Bearer ' + bearer
          },
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
      }, 1000)
    })
  }

  tableData () {
    return new Promise(async(resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedTableId = localStorage.getItem("table_id")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const table_id = encrypt.decryptData(decryptedTableId)
      const bearer = localStorage.getItem("bearer")
      const table_id = localStorage.getItem("table_id")
      api.get('/partner/table/' + table_id, {
        headers: {
          Authorization: 'Bearer ' + bearer
        },
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

export default StoreAuthRepository
