<template>
  <div class="home">
    <img alt="Vue logo" src="../../public/images/logo.png">
    <HelloWorld :msg = "msg"
    :productNum.sync = 'productNum'
    :name = 'name'
    @sayHello = "sayHello"
    />
    <div class="btn-car">
      <div class="add-car" @click="handleAddCar">+</div>
      <div class="reduce-car" @click="handleReduceCar">-</div>
    </div>
    <div class="action">vuex+axios异步例子：{{productList.data.msg}}</div>
    <div class="btn-car" @click="updateProductDataList">
      <div class="load">load</div>
    </div>
    <div class="action">雪碧图处理例子</div>
    <ul class="sprit">
      <li class="icon icon-icon1"></li>
      <li class="icon icon-icon2"></li>
      <li class="icon icon-icon3"></li>
      <li class="icon icon-icon4"></li>
      <li class="icon icon-icon6"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { home } from '../../../../mixins/index';
import { getHotProduct } from '../../../../api/home';
import {
    State,
    Getter,
    Mutation,
    Action,
    namespace,
} from 'vuex-class';
// 引入home页面的vuex
const homeStore = namespace('homeStore');
@Component({
  mixins: [home],
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // 页面数据
  count: number = 10
  productNum: number = 0
  msg: string = 'Welcome to Your Vue.js + TypeScript App'
  name: string = 'zhou'
  // vuex数据
  @homeStore.State('productList') public productList: any
  @homeStore.Mutation('addCar')
  public handleAddCar: () => void
  @homeStore.Mutation('reduceCar')
  public handleReduceCar: () => void
  @homeStore.Action('updateProductData') updateProductDataList: () => void
  
  mounted(){
    this.count = 20
    this.$on('reset', function(n: string) {
      console.log(n)
    })
    this.emitTodo('do');
    this.getProductList();
  }
  @Watch('count')
  countchange(newVal: number, oldVal: number){
    console.log('newvalue', newVal)
  }
  @Emit('reset')
  emitTodo(n: string){
    console.log('to')
  }

  get num () {
    return this.count
  }

  sayHello(n): void {
    console.log(n)
  }
  async getProductList() {
    try {
      let params = {}
      let res = await getHotProduct(params)
      if (res.data.code === 0) {
        console.log("初始化商品",res);
      } else{
        console.log(res.data.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  .btn-car{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    div{
      width: 60px;
      height: 60px;
      background-color: #ff8000;
      line-height: 60px;
      text-align: center;
      font-size: 40px;
    }
    .load{
      width: 1.6rem;
      font-size: 26px;
    }
  }
  .action{
    width: 750px;
    height: 80px;
    margin: 20px 0;
    line-height: 80px;
    text-align: center;
    background-color: red;
    color: #fff;
    font-size: 40px;
    margin-bottom: 20px;
  }
  .sprit{
    display: flex;
    justify-content: space-between;
    list-style: none;
    li{
      width: 128px;
      height: 128px;
    }
  }
}
</style>
