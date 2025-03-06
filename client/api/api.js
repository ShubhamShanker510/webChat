import axios from 'axios'

export const sendData=async(data)=>{
    try {
        
        const response=await axios.post('http://localhost:3000/api/user/register',data,{
            withCredentials: true
        })
        console.log("response=>",response)

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

export const getUserData=async()=>{
    try {
        const response=await axios.get('http://localhost:3000/api/user/get',{
            withCredentials: true
        });

        if(response.data.success===true){
            return response.data;
        }else{
            return response.data.success;
        }
        
    } catch (error) {
        console.log("Getting user data failed=>",error);
        return error.response.data.message
    }
}

export const logOutUser=async()=>{
    try {
        const response=await axios.delete('http://localhost:3000/api/user/logout',{
            withCredentials: true
        })

        return response;
        
    } catch (error) {
        console.log("LogOut user error=>", error);
        return error.response.data.message;
    }
}

export const createMeeting=async(userId)=>{
    try {
        const response=await axios.post(`http://localhost:3000/api/meet/create`,userId,{withCredentials: true});

        if(response.data.success===true){
            return response.data;
        }else{
            return response.data.success;
        }
    } catch (error) {
        console.log("Create meeting error");
    }
}

export const joinMeeting=async(meetingId)=>{
    try {
        const response=await axios.post(`http://localhost:3000/api/meet/join/${meetingId}`,{withCredentials: true});

        if(response.data.success===true){
            return response.data;
        }else{
            return response.data.success;
        }
    } catch (error) {
        console.log("Create meeting error");
    }
}