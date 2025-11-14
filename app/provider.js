"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { UserDetailContext } from './_context/UserDetailContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function Provider({children}) {

    const {user}=useUser();
    const [UserDetail,setUserDetail]=useState([]);
    useEffect(()=>{
        user&&VerifyUser();
    },[user])
    /**
     * verify user
     */
    const VerifyUser=async()=>{
      const dataResult=await axios.post('/api/verify-user',{
        user:user
      });
      setUserDetail(dataResult.data.result);
     // console.log(dataResult.data)
    }

  return (
    <UserDetailContext.Provider value={{UserDetail,setUserDetail}}>
              <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,currency: "USD" }}>
    <div>
        {children}
    </div>
    </PayPalScriptProvider>
    </UserDetailContext.Provider>
  )
}

export default Provider