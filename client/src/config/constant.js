import axioss from 'axios';// import thu vien de sai
//const ApiLink ="https://tiemdo-api.herokuapp.com/api/";
const ApiLink = "https://webbanhang-api.herokuapp.com/api/";
//const ApiLink ="http://localhost:3023/api/"; // link api

const axios = axioss.create({ 
    baseURL: ApiLink,
    timeout: 15*1000,
})

export {axios};