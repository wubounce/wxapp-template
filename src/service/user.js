import http from './http.js';


const checkoutAuthApi = '/checkoutAuth';
const userApi = '/user';

export const checkoutAuth = (payload) => http.postRequest(checkoutAuthApi, { data: payload }); // 登录

export const getUser = (payload) => http.getRequest(userApi, { data: payload }); // 登录
