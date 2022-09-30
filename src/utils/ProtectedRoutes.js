import React from 'react'
import '../App.css'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';



function ProtectedRoutes({ children, ...rest}) {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);


return (
    <>
    {admin ? ( 
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <Outlet />
            </div>
        </>

    ): <Navigate to="/login"  /> } 
    </>
    )
  
}

export default ProtectedRoutes