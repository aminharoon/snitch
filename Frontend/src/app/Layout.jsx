import React from 'react'
import {Navbar} from "../components/index"
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const Layout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
  <>
    <Navbar user={user} isLoggedIn={!!user} userName={user?.fullName || user?.name || "User"} />
   <Outlet />
    </>
  )
}

export default Layout