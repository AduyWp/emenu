import ConfigModel from 'models/config.model'
const config = new ConfigModel()

class AuthModel {
  isLogin () {
    return new Promise((resolve, reject) => {
      config.show('user').then((data) => {
        resolve(data)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  login (payload) {
    return new Promise((resolve, reject) => {
      config.store('user', payload).then((data) => {
        resolve(data)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  logout () {
    return new Promise((resolve, reject) => {
      config.destroy('user').then(() => {
        resolve()
      }).catch((e) => {
        reject(e)
      })
    })
  }
}

export default AuthModel
