// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

//导入pinia  
import App from './App.vue'
import pinia from './stores/index.js'

export function createApp() {
	const app = createSSRApp(App)

	// 将pinia实例挂载到vue实例上 
	app.use(pinia);

	return {
		app,
	}
}
// #endif