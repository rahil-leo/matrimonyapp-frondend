import { createApp } from 'vue'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import router from './routes/router'

const app = createApp(App).use(router)
app.mount('#app')
