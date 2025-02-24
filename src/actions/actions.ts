import axios from "axios";
import { toast } from "sonner";

export const API_URL = import.meta.env.VITE_API_URL;
//export const API_URL = "http://localhost:8083";

export const getActions = async (url : string) => {
    try {
        const response = await axios.get(`${API_URL}${url}` , {
            // headers : {}
        });
        return response; 
    } catch (error : any) {
        toast.error(error.message);
        console.log(error);
    }
}

export const postActions = async (url : string , payload : any) => {
    try {
        const response = await axios.post(`${API_URL}${url}` , payload 
            // , {
            //     headers : {
            //         Authorization : `Bearer ${JSON.parse(localStorage.getItem("credentials") as string)?.token}`
            //     }
            // }
        );
        return response; 
    } catch (error : any) {
        toast.error(error.message);
        console.log(error);
    }
}

export const putActions = async (url : string , payload : any) => {
    try {
        const response = await axios.put(`${API_URL}${url}` , payload 
            // , {
            //     headers : {
                    
            //     }
            // }
        );
        return response; 
    } catch (error : any) {
        toast.error(error.message);
        console.log(error);
    }
}

export const deleteActions = async (url : string) => {
    try {
        const response = await axios.delete(`${API_URL}${url}`
            // , {
            //     headers : {
            //     }
            // }
        );
        return response; 
    } catch (error : any) {
        toast.error(error.message);
        console.log(error);
    }
}