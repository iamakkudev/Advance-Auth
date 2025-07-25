import {create} from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set,get) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading: false,
    isCheckAuth: true,
    message:null,

    signup: async(email, password,name) =>{
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URL}/signup`,{email,password,name})

            set({user:response?.data?.user, isAuthenticated:true, isLoading:false})
        } catch (error) {;
            set({error:error.response?.data?.message || "Error signing up", isLoading:false})
            throw error;
            
        }
    },
    login: async(email,password) =>{
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URL}/login`,{email,password})

            set({user:response?.data?.user, isAuthenticated:true, isLoading:false})
        } catch (error) {;
            set({error:error.response?.data?.message || "Error loggining", isLoading:false})
            throw error;
            
        }
    },
    verifyEmail: async(code) =>{
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`,{code})

            set({user:response?.data?.user, isAuthenticated:true, isLoading:false})
            return response.data;
        } catch (error) {;
            set({error:error.response?.data?.message || "Error verify email", isLoading:false})
            throw error;
            
        }
    },
    checkAuth: async() =>{
        set({isCheckAuth:true,error:null});
        try {
            const response = await axios.post(`${API_URL}/check-auth`)

            set({user:response?.data?.user, isAuthenticated:true, isCheckAuth:false})
            return response.data;
        } catch (error) {;
            set({error: null, isAuthenticated:false, isCheckAuth:false})
            throw error;
            
        }
    },
    logout: async() =>{
        set({isLoading:true,error:null});
        try {
            await axios.post(`${API_URL}/logout`)

            set({user:null, isAuthenticated:false, isLoading:false})
        } catch (error) {;
            set({error:"Error logging out", isLoading:false})
            throw error;
            
        }
    },
    forgotPassword: async(email) =>{
         set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URL}/forgot-password`,{email})

            set({message: response?.data?.message, isLoading:false})
        } catch (error) {;
            set({error:error.response?.data?.message || "Error forgot password", isLoading:false})
            throw error;
            
        }
    },
    resetPassword: async(token, password)=>{
        set({isLoading:true,error:null});
         try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`,{password})

            set({message:response?.data?.message, isLoading:false})
            return response.data;
        } catch (error) {;
            set({error:error.response?.data?.message || "Error verify email", isLoading:false})
            throw error;
            
        }
    }
}))