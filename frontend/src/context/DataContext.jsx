import React, { createContext, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import {toast} from 'react-toastify'

export const DataContext=createContext();


const DataContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token,setToken]=useState(localStorage.getItem('token') || "")
    const [challenge,setChallenge] = useState([])
    const [submissions,setSubmissions] = useState([])    

    console.log(token);

    const finalToken = localStorage.getItem('token') || token 

    const totalChallenges = challenge.length
    const completedCount = submissions.filter((item)=>item.status==="completed").length;
    const inprogressCount = submissions.filter((item)=>item.status==="in-progress").length

    
    const challengeList = async () => {
        try {
            
            const response = await axios.get(backendUrl+'/api/challenge/list')

            if (response.data.success) {
                setChallenge(response.data.challenges)
            }
            else{
                console.log(response.data.message);
            }

        } catch (error) {
            toast.error("something went wrong ")
        }
    }

    const getUserSubmissions = async () => {
        try {
            const response = await axios.get(backendUrl+'/api/submission/user',{headers:{token:finalToken}})
            console.log(response.data);

            if (response.data.success) {
                setSubmissions(response.data.challenges)
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        challengeList()
    },[])

    useEffect(()=>{
        if(token){
            getUserSubmissions()
        }
    },[token])

    const value = {
        token,setToken,backendUrl,challenge,setChallenge,submissions,totalChallenges,completedCount,inprogressCount
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;