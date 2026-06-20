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
    const [userName,setUserName] = useState("")
    const [leaderboard,setLeaderboard] = useState([])
    const [currentUser,setCurrentUser] = useState(null)
    const [profileData,setProfileData] = useState({})
    const [bookmark,setBookmark] = useState([])

    console.log(token);

    const finalToken = localStorage.getItem('token') || token 

    const totalChallenges = challenge.length
    const completedCount = submissions.filter((item)=>item.status==="completed").length;
    const inprogressCount = submissions.filter((item)=>item.status==="in-progress").length;
    const easyCount = submissions.filter((item)=>item.status==="completed" && item.challengeId.difficulty.toLowerCase() === "easy").length || 0;
    const mediumCount = submissions.filter((item)=>item.status==="completed" && item.challengeId.difficulty.toLowerCase() ==="medium").length || 0;
    const hardCount = submissions.filter((item)=> item.status==="completed" && item.challengeId.difficulty.toLowerCase()==="hard").length || 0;
    const HTMLCount = submissions.filter((item)=> item.status==="completed" && item.challengeId.category.toLowerCase()==="html").length || 0;
    const CSSCount = submissions.filter((item)=> item.status==="completed" && item.challengeId.category.toLowerCase()==="css").length || 0


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

            if (response.data.success) {
                console.log(response.data);
            
                setSubmissions(response.data.challenges)
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    const getLeaderboard = async () => {
        try {
            const response = await axios.post(backendUrl+'/api/user/leaderboard',{},{headers:{token:finalToken}})
            if (response.data.success) {
                console.log(response.data);
                setLeaderboard(response.data.leaderboard)
                setCurrentUser(response.data.currentUserDetails)
            }
            else{
                console.log(response.data.message);
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getProfileData = async () => {
        try {
            const response = await axios.get(backendUrl+'/api/profile/details',{headers:{token:finalToken}})
            if (response.data.success) {
                setProfileData(response.data.userData)
                
            }
            else{
                console.log(response.data.message );
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const toggleBookmark = async (id) => {
        try {
            
            const response = await axios.post(backendUrl+'/api/profile/bookmark',{challengeId:id},{headers:{token:finalToken}})

            if (response.data.success) {
                getBookmarks();
                toast.success(response.data.message)
            }
            else{
                toast.error("bookmark failed to add/remove")
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }

    const getBookmarks = async () => {
        try {
            const response = await axios.get(backendUrl+'/api/profile/allbookmarks',{headers:{token:finalToken}});
            if (response.data.success) {
                setBookmark(response.data.bookmarks)
            }
            else{
                console.log(response.data.message);
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
            getLeaderboard()
            getProfileData()
            getBookmarks()
        }
    },[token])


    const value = {
        token,setToken,backendUrl,challenge,setChallenge,submissions,totalChallenges,completedCount,inprogressCount,
        easyCount,mediumCount,hardCount,HTMLCount,CSSCount,userName,setUserName,leaderboard,currentUser,profileData,
        toggleBookmark,bookmark,setBookmark,
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;