import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mitt from 'mitt';
import ElementPlus from 'element-plus'
import ko from 'element-plus/es/locale/lang/ko'

const app = createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus, {locale: ko})

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.mount('#app')
