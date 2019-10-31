 // 默认利用axios的cancelToken进行防重复提交。
 // 如需允许多个提交同时发出。则需要在请求配置config中增加 neverCancel 属性，并设置为true

 import axios from 'axios';


 /* 创建axios实例 */
 const service = axios.create({
     baseURL: process.env.NODE_ENV === "production" ? 'https://api.quanfenshop.com' : 'https://api.quanfenshop.com',
     timeout: 5000, // 请求超时时间
 });
 /* 请求拦截器 */
 service.interceptors.request.use((config: any) => {
     return config;
 }, (error: any) => {
     Promise.reject(error);
 });

 /* 响应拦截器 */
 service.interceptors.response.use(
     (response: any) => {
        return response;
     },
     (error: any) => {
         // 异常处理
         console.log(error)
         return Promise.reject(error);
     },
 );

 export default service;