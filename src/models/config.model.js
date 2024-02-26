import { db } from 'boot/database'
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";

class ConfigModel
{
  index() {
    return new Promise((resolve, reject) => {
      db.configs.get().toArray().then((data) => {
        if (!data) reject(new Error('Not Found'))

        resolve(data)
      }).catch((e) => {
        reject(e)
      })
      db.dataCard.get().toArray().then((data) => {
        if (!data) reject(new Error('Not Found'))

        resolve(data)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  show(key) {
    return new Promise((resolve, reject) => {
      db.configs.where('key').equals(key).first().then((data) => {
        if (!data) reject(new Error('Not Found'))
        resolve(data)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  realtimeShow(key) {
    return new Promise((resolve, reject) => {
      try {
        useObservable(
          liveQuery(() => resolve(db.configs.where('key').equals(key).first()))
        )
      } catch (e) {
        reject(e)
      }
    })
  }

  store(key, value) {
    return new Promise((resolve, reject) => {
      this.show(key).then(() => {
        reject(new Error('Key already exists'))
      }).catch(() => {
        db.configs.add({
          key: key,
          value: value
        }).then((data) => {
          if (!data) reject(new Error('Failed to store'))

          resolve(data)
        }).catch((e) => {
          reject(e)
        })
      })
    })
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      this.show(key).then((config) => {
        db.configs.update(config.id, {
          value: value
        }).then((data) => {
          if (!data) reject(new Error('Failed to update'))

          resolve(data)
        }).catch((e) => {
          reject(e)
        })
      }).catch(() => {
        reject(new Error('Key doenst exists'))
      })
    })
  }

  destroy(key) {
    return new Promise((resolve, reject) => {
      this.show(key).then((config) => {
        db.configs.delete(config.id).then(() => {
          resolve()
        }).catch((e) => {
          reject(e)
        })
      }).catch(() => {
        reject(new Error('Key doenst exists'))
      })
    })
  }
}

export default ConfigModel