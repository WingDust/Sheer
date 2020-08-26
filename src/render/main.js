import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import router from './router/index';
import { state} from './store/index'

/** 滑动条 */
import "./css/SpecificImpact/scrollbar.css"




/** Prism */
import "prismjs/themes/prism.css"
import "prismjs/themes/prism-solarizedlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"



/** Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";



const app = createApp(App)
app.use(router)
app.use(state)


app.mount('#app')
