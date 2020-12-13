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

export async function postEditFile({file_name, file_data}){
    const result = await instance.post('/editfile',{file_name,file_data});
    return result.data
}

export async function getPwd(){
    const result = await instance.get('/pwd');
    return result.data
}

export async function postCd({dir_name}){
    const result = await instance.post('/cd',{dir_name});
    return result.data
}

export async function postRmDir({dir_name}){
    const result = await instance.post('/rmdir',{dir_name});
    return result.data
}

export async function postFileContent({file_name}){
    const result = await instance.post('/readfile',{file_name});
    return result.data
}

export async function postMkDir({new_dir_name}){
    const result = await instance.post('/mkdir',{new_dir_name});
    return result.data
}


export async function postAudioFile(blob,fileName){
    console.log("aaaaaaaaaa");
    var formData = new FormData();
    console.log(blob);
    formData.append("blob",blob,fileName);
    console.log(formData);
    const result = await instance.post('/saveAudioFile',formData,{headers: {
        'Content-Type': 'multipart/form-data'
    }});
    return result.data
}

export async function postAudioUrl({audio_file_name}){
    const result = await instance.post('/audioUrl',{audio_file_name});
    return result.data
}

export async function postRename({old_name,new_name}){
    const result = await instance.post('/rename',{old_name,new_name});
    return result.data
}

