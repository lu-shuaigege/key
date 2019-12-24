import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

const prePage = () => {
 let pages = getCurrentPages();
 let prePage = pages[pages.length - 2];
 // #ifdef H5
 return prePage;
 // #endif
 return prePage.$vm;
}

Vue.prototype.$api = {
 prePage
};

App.mpType = 'app'

const app = new Vue({
    ...App
})


app.$mount()