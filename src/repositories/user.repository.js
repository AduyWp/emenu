import { api } from 'boot/axios'
import { Loading, Notify } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

class UserRepository {
	cardDetail () {
	    return new Promise(async(resolve, reject) => {
	    	// decrypted
	    	// const decryptedBearer = localStorage.getItem("bearer")
  			// const decryptedOutlet = localStorage.getItem("outlet")
  			// const decryptedTadaToken = localStorage.getItem("tadaToken")
  			// const decryptedCardNo = localStorage.getItem("cardno")
  			// set value
	    	// const bearer = encrypt.decryptData(decryptedBearer)
      		// const outlet = encrypt.decryptData(decryptedOutlet)
	      	// const tadaToken = encrypt.decryptData(decryptedTadaToken)
	      	// const cardNo = encrypt.decryptData(decryptedCardNo)
	      	const bearer = localStorage.getItem("bearer")
      		const outlet = localStorage.getItem("outlet")
	      	const tadaToken = localStorage.getItem("tadaToken")
	      	const cardNo = localStorage.getItem("cardno")
	      	api.get('/partner/'+ outlet + '/tada/cardDetail', {
	        	headers: {
	          		Authorization: 'Bearer ' + bearer
	        	},
	       		params: {
	          		accessToken: tadaToken,
	          		cardno: cardNo,
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

export default UserRepository
