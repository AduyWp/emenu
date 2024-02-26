import { boot } from 'quasar/wrappers'
import axios from 'axios'
import AuthModel from '../models/auth.model'
const auth = new AuthModel()

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    if (err.response) {
      // API was invalid
      if (err.response.status === 401 ) {
        // await auth.logout()
        // setTimeout(() => {
        //   return window.location.href = '/onboarding'
        // }, 1000)
        console.log(err)
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data)
      }
    }

    return Promise.reject(err)
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
