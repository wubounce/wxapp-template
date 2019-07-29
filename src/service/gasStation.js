import http from './http.js';


const gasStationApi = '/shop/list';


export const getGasStationList = (payload) => http.postRequest(gasStationApi, { baseURL: 'https://userapi.qiekj.com', data: payload }); // 登录
