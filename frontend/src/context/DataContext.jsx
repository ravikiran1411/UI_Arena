import React, { createContext, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import {toast} from 'react-toastify'

export const DataContext=createContext();


const DataContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token,setToken]=useState(localStorage.getItem('token') || "")
    const [challenge,setChallenge] = useState([])

    console.log(token);
    

    const challengeList = async () => {
        try {
            
            const response = await axios.get(backendUrl+'/api/challenge/list')

            if (response.data.success) {
                setChallenge(response.data.challenges)
                console.log(response.data.challenges);
            }
            else{
                console.log(response.data.message);
            }

        } catch (error) {
            toast.error("something went wrong ")
        }
    }

    useEffect(()=>{
        challengeList()
    },[])

    const value = {
        token,setToken,backendUrl,challenge,setChallenge
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;