import React from 'react'
import { useSelector } from 'react-redux'
import {  Navigate } from 'react-router'


const ProtectedComponent = ({children,isRole="buyer"}) => {
 
  const {user,loading} = useSelector((state)=>state.auth)



  if(loading){
    return <h1>loading .....</h1>
  }
  if(!user){
      return   <Navigate to={"/login"} />
  }
  if(user.role !==isRole){
    return <Navigate  to="/"/>

  }
  return ( children )
}

export default ProtectedComponent