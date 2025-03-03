import axios from 'axios'

export const sendData=async(data)=>{
    try {
        
        const response=await axios.post('http://localhost:3000/api/user/register',data,{
            withCredentials: true
        })

        if(response.data.success===true){
            return response.data;
        }else{
            return response.data.success;
        }

    } catch (error) {
        console.log("Sending user data failed=>",error.response.data);
        return error.response.data;
    }
}

export const loginData=async(data)=>{
    try {
        const response=await axios.post('http://localhost:3000/api/user/login',data,{
            withCredentials: true
        })

        if(response.data.success===true){
            return response.data;
        }else{
            return response.data.success;
        }

    } catch (error) {
        console.log("Sending user data failed=>",error.response.data);
        return error.response.data;
    }
}
