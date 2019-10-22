import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from './modules/home'
import aboutStore from './modules/about'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      homeStore,
      aboutStore
    },
})