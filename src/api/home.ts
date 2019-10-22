import request from "../common/script/utils/request";

/*
 * @Description: 获取热门推荐商品
 * @Date: 2019-08-23 11:29:45
 */
export function getHotProduct(params:any) {
  return request({
      url: "/market/prod/hot",
      method: "get",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      },
      params
  });
}
/*
 * @Description: 添加购物车
 * @params {string}  productId 商品id
 * @params {number}  count 商品数量 
 * @params {string}  platId 平台id
 */
export function orderConfirm(params:any) {
  return request({
      url: "/cart/add",
      method: "post",
      headers: {
          'Content-Type': 'application/json'
      },
      data: params
  });
}