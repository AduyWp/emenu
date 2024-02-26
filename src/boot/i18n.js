import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import ConfigModel from '../models/config.model'
const config = new ConfigModel()
let i18n = createI18n({
  legacy: false,
  locale: 'id-ID',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages
})
export default boot(async ({ app }) => {
  try {
    const data = await config.show('language')
    i18n.global.locale.value = data.value
    app.use(i18n)
  } catch (e) {
    app.use(i18n)
  }
})