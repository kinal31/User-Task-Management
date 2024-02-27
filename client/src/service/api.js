import axios from 'axios'
const URL = "http://localhost:5000";


export const addUser = async(data)=>{
    try {
        return await axios.post(`${URL}/addUser`,data)
    } catch (error) {
        console.log("error while calling add user api", error);
    }
}
export const getUsers = async()=>{
    try {
        return await axios.get(`${URL}/allUser`)
    } catch (error) {
        console.log("error while calling getUser api",error)
    }
}
export const addTask = async(data)=>{
    try {
        return await axios.post(`${URL}/addTask`,data)
    } catch (error) {
        console.log("error while calling add Task api", error);
    }
}
export const getTasks = async()=>{
    try {
        return await axios.get(`${URL}/allTask`)
    } catch (error) {
        console.log("error while calling getUser api",error)
    }
}

export const deleUser = async(id) =>{
    try{
        return await axios.delete(`${URL}/delete/${id}`)
    }catch(error){
        console.log("error while calling deleUser api",error)
    }
}

export const getTask = async(id) =>{
    try{
        return await axios.get(`${URL}/task/${id}`)
    }catch(error){
        console.log("error while calling handlebtndetail api",error)
    }
}
