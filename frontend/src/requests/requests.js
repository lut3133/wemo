import axios from 'axios';

const API_DEFAULT = "http://localhost:9090/";
const instance = axios.create({ baseURL: API_DEFAULT });

export async function postLogin({id, password}){
    const result = await instance.post('/api/login',{id, password});
    return result.data
}

export default postLogin;