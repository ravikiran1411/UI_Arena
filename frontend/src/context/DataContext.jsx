import React, { createContext, useState } from 'react'

export const DataContext=createContext();


const DataContextProvider = (props) => {

    const [token,setToken]=useState(localStorage.getItem('token') || "")
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        token,setToken,backendUrl
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;