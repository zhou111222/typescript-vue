<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="car">vuex同步测试例子：{{carNum}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { log } from 'util';
import {
    State,
    namespace,
} from 'vuex-class';
// 引入home页面的vuex
const homeStore = namespace('homeStore');
@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;
  @Prop()
  productNum: number
  @Prop({default: 'zhoupemgfei'})
  name: string
  // vuex数据
  @homeStore.State('carNum') public carNum: number | undefined
  @Emit('sayHello')
  sayHello() {
    let str = 'hello world'
    return str
  }
  @Emit('productNum')
  productNum1() {
    this.productNum ++
    return this.productNum
  }
  mounted() {
    interface Fun {(
      x:number,
      y:number,
      desc?:string
    ): void}
    const sun:Fun = function(x,y,desc) {
        console.log(desc,x+y)
    }
    sun(1,2,'sun:')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  font-size: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.car{
  width: 750px;
  height: 80px;
  margin: 20px 0;
  line-height: 80px;
  text-align: center;
  background-color: red;
  color: #fff;
  font-size: 40px;
}
</style>
