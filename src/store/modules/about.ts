import { Module, VuexModule } from 'vuex-module-decorators'

@Module({ name: 'aboutStore',  namespaced: true, stateFactory: true })
export default class aboutStore extends VuexModule {
  name = 'zhou'
}