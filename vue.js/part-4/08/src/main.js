import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import ko from 'element-plus/es/locale/lang/ko'

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus, {locale: ko})
    .mount('#app')