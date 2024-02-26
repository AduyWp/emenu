import { api } from 'boot/axios'
import { Loading, Notify } from 'quasar'
import Encryptions from 'helpers/Encryptions'
const encrypt = new Encryptions()

class VoucherRepository {
	allVoucherList (page) {
	    return new Promise(async(resolve, reject) => {
	    	// decrypted
	    	// const decryptedBearer = localStorage.getItem("bearer")
  			// const decryptedOutlet = localStorage.getItem("outlet")
  			// const decryptedTadaToken = localStorage.getItem("tadaToken")
  			// const decryptedCardno = localStorage.getItem("cardno")
  			// const decryptedProgram = localStorage.getItem("program")

  			// set value
	    	// const bearer = encrypt.decryptData(decryptedBearer)
      		// const outlet = encrypt.decryptData(decryptedOutlet)
	      	// const tadaToken = encrypt.decryptData(decryptedTadaToken)
	      	// const program = encrypt.decryptData(decryptedProgram)
	      	// const cardno = encrypt.decryptData(decryptedCardno)
	      	const bearer = localStorage.getItem("bearer")
      		const outlet = localStorage.getItem("outlet")
	      	const tadaToken = localStorage.getItem("tadaToken")
	      	const program = localStorage.getItem("program")
	      	const cardno = localStorage.getItem("cardno")

	      	api.get('/outlet/' + outlet + '/tada/listRedeem', {
	        	headers: {
	          		Authorization: 'Bearer ' + bearer
	        	},
	       		params: {
	          		accessToken: tadaToken,
	          		program: program,
	          		cardno: cardno,
	          		page
	        	}
	      	})
	      	.then((response) => {
	        	resolve(response.data)
	      	})
	      	.catch((error) => {
        		reject(error)
        		console.log(error)
	      	})
	    })
	}

	voucherList () {
	    return new Promise(async(resolve, reject) => {
	    	// decrypted
	    	// const decryptedBearer = localStorage.getItem("bearer")
  			// const decryptedOutlet = localStorage.getItem("outlet")
  			// const decryptedTadaToken = localStorage.getItem("tadaToken")
  			// const decryptedPhone = localStorage.getItem("phone")
  			// set value
	    	// const bearer = encrypt.decryptData(decryptedBearer)
      		// const outlet = encrypt.decryptData(decryptedOutlet)
	      	// const tadaToken = encrypt.decryptData(decryptedTadaToken)
	      	// const phone = encrypt.decryptData(decryptedPhone)
	      	const bearer = localStorage.getItem("bearer")
      		const outlet = localStorage.getItem("outlet")
	      	const tadaToken = localStorage.getItem("tadaToken")
	      	const phone = localStorage.getItem("phone")
	      	api.get('/partner/'+ outlet + '/tada/listVouchers', {
	        	headers: {
	          		Authorization: 'Bearer ' + bearer
	        	},
	       		params: {
	          		accessToken: tadaToken,
	          		phone: phone
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

	orderVoucher(walletName, cardPin, variantId, itemId) {
		return new Promise(async(resolve, reject) => {
			// decrypted
			// const decryptedBearer = localStorage.getItem("bearer")
  			// const decryptedOutlet = localStorage.getItem("outlet")
  			// const decryptedTadaToken = localStorage.getItem("tadaToken")
  			// const decryptedCardno = localStorage.getItem("cardno")

  			// set value
  			// const bearer = encrypt.decryptData(decryptedBearer)
      		// const outlet = encrypt.decryptData(decryptedOutlet)
      		// const tadaToken = encrypt.decryptData(decryptedTadaToken)
      		// const cardno = encrypt.decryptData(decryptedCardno)

      		const bearer = localStorage.getItem("bearer")
      		const outlet = localStorage.getItem("outlet")
	      	const tadaToken = localStorage.getItem("tadaToken")
	      	const cardno = localStorage.getItem("cardno")

			const headers = {
	        	Authorization: 'Bearer ' + bearer
	      	};
	      	const data = {
	        	accessToken: tadaToken,
	        	walletName: walletName,
	        	cardNumber: cardno,
	        	cardPin: cardPin,
	        	variantId: variantId,
	        	itemId: itemId
	      	}
	      	api.post('/outlet/'+ outlet + '/tada/orderRedeem', data, {
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

	voucherDetail (voucherNumber) {
	    return new Promise(async(resolve, reject) => {
	    	// decrypted
	    	// const decryptedBearer = localStorage.getItem("bearer")
  			// const decryptedOutlet = localStorage.getItem("outlet")
  			// const decryptedTadaToken = localStorage.getItem("tadaToken")
  			// set value
	    	// const bearer = encrypt.decryptData(decryptedBearer)
      		// const outlet = encrypt.decryptData(decryptedOutlet)
	      	// const tadaToken = encrypt.decryptData(decryptedTadaToken)
	      	const bearer = localStorage.getItem("bearer")
      		const outlet = localStorage.getItem("outlet")
	      	const tadaToken = localStorage.getItem("tadaToken")
	      	api.get('/outlet/'+ outlet + '/tada/voucherDetail', {
	        	headers: {
	          		Authorization: 'Bearer ' + bearer
	        	},
	       		params: {
	          		accessToken: tadaToken,
	          		voucher: voucherNumber,
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

	useVoucher (invoice_number, amount, voucherNumber) {
	    return new Promise(async(resolve, reject) => {
	    	// decrypted
			// const decryptedBearer = localStorage.getItem("bearer")
  			// const decryptedOutlet = localStorage.getItem("outlet")
  			// const decryptedTadaToken = localStorage.getItem("tadaToken")
			// set value
			// const bearer = encrypt.decryptData(decryptedBearer)
      		// const outlet = encrypt.decryptData(decryptedOutlet)
	      	// const tadaToken = encrypt.decryptData(decryptedTadaToken)
	      	const bearer = localStorage.getItem("bearer")
      		const outlet = localStorage.getItem("outlet")
	      	const tadaToken = localStorage.getItem("tadaToken")
			const headers = {
	        	Authorization: 'Bearer ' + bearer
	      	};
	      	const data = {
	        	accessToken: tadaToken,
	        	invoice: invoice_number,
	        	total: amount,
	        	voucher: voucherNumber
	      	}
	      	api.post('/outlet/'+ store + '/tada/redeemVoucher', data, {
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
}

export default VoucherRepository
