import { api } from 'boot/axios'
import axios from 'axios'
import { Loading, Notify } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()
import moment from 'moment'

class OrderRepository {
  sendOrder (name, details, paymentType, taxValue, amountUse, total, totalWithoutDiscount) {
    return new Promise((resolve, reject) => {
      // decrypted
      // const decryptedBearer = localStorage.getItem("bearer")
      // const decryptedOutletId = localStorage.getItem("outlet_id")
      // const decryptedStoreId = localStorage.getItem("store_id")
      // const decryptedTableId = localStorage.getItem("table_id")
      // const decryptedTableName = localStorage.getItem("tableName")
      // const decryptedDinein = localStorage.getItem("dinein")
      // const decryptedTadaMember = localStorage.getItem("tadaMember")
      // set value
      // const bearer = encrypt.decryptData(decryptedBearer)
      // const outlet_id = encrypt.decryptData(decryptedOutletId)
      // const store_id = encrypt.decryptData(decryptedStoreId)
      // const table_id = encrypt.decryptData(decryptedTableId)
      // const tableName = encrypt.decryptData(decryptedTableName)
      // const dinein = JSON.parse(encrypt.decryptData(decryptedDinein))
      // const tadaMember = JSON.parse(encrypt.decryptData(decryptedTadaMember))
      const bearer = localStorage.getItem("bearer")
      const outlet_id = localStorage.getItem("outlet_id")
      const store_id = localStorage.getItem("store_id")
      const table_id = localStorage.getItem("table_id")
      const tableName = localStorage.getItem("tableName")
      const dinein = JSON.parse(localStorage.getItem("dinein"))
      const tadaMember = JSON.parse(localStorage.getItem("tadaMember"))
      const date_post = moment(new Date).format('YYYY-MM-DD HH:mm:ss')
      
      const tadaMemberData = {
        name: tadaMember.user.name,
        phone: tadaMember.user.phone,
        card_id: tadaMember.card.id,
        program_id: tadaMember.card.programId,
        voucher_id: '',
        voucher_claimed: 0,
        extraSales: '',
      }
      const data = {
        store_id: store_id,
        outlet_id: outlet_id,
        table_id: table_id,
        name: tableName,
        date_post: date_post,
        pickup_time: '',
        dinein: dinein,
        status: 0,
        address: '',
        sms: tadaMember.user.phone,
        real_name: tadaMemberData.name,
        donation: '',
        tax: taxValue,
        discount: amountUse,
        delivery_fee: '',
        rounding: total,
        total_final: totalWithoutDiscount,
        payment_type: paymentType,
        isread: 0,
        email: '',
        details: JSON.stringify(details),
        tada_user: JSON.stringify(tadaMemberData),
      }
      api.post('partner/' + outlet_id + '/transaction/add_delivery', data, {
        headers: {
          Authorization: 'Bearer ' + bearer
        }
      })
      .then(async(response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
  getTransaction (transaction_id) {
    return new Promise((resolve, reject) => {
      // decrypted
      const decryptedBearer = localStorage.getItem("bearer")
      // set value
      const bearer = encrypt.decryptData(decryptedBearer)
      
      api.get('partner/emenu_sale/' + transaction_id, {
        headers: {
          Authorization: 'Bearer ' + bearer
        }
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

export default OrderRepository
