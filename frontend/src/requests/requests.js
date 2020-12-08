import axios from 'axios';

const API_DEFAULT = "http://localhost:9090/";
const instance = axios.create({ baseURL: API_DEFAULT });

export async function postLogin({id, password}){
    const result = await instance.post('/api/users/login',{id, password});
    return result.data
}

export async function postRegister({name, id, password, password2}){
    const result = await instance.post('/api/users/register',{name, id, password, password2});
    return result.data
}

export async function postMakeFile({file_name, file_data}){
    const result = await instance.post('/editfile',{file_name, file_data});
    return result.data
}

export async function postDeleteFile({file_name}){
    const result = await instance.post('/rmFile',{file_name});
    return result.data
}

export async function getLs(){
    const result = await instance.get('/get-file-infos');
    return result.data
}
export async function getLsAndContent(){
    const result = await instance.get('/get-file-contents-infos');
    return result.data
}