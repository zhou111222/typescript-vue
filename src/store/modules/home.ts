import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { getHotProduct } from '../../api/home'
import store from './store'

@Module({ name: 'homeStore',  namespaced: true, dynamic:true, store })
export default class homeStore extends VuexModule {
  carNum = 2
  productList = {
    data: {
      msg:'loading...'
    }
  }
  get price(){
    return this.carNum * 2
  }
  @Mutation
  addCar(){
    this.carNum ++
  }
  @Mutation
  reduceCar(){
    this.carNum --
  }
  @Mutation
  getCarNum(n: number){
    this.carNum = n
  }
  @Mutation
  getProductData(data: any){
    this.productList = data
  }
  @Action({commit: 'getProductData'})
  async updateProductData(){
    try {
      let params = {}
      let res = await getHotProduct(params)
      if (res.data.code === 0) {
        return res
      }
    } catch (error) {
      console.log(error)
    }
  }
}