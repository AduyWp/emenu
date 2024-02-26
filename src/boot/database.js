import Dexie from 'dexie'
export const db = new Dexie('popcorn')

db.version(1).stores({
  configs: '++id, key, value'
})
