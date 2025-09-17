import { useContext, useEffect } from "react"
import { AuthContext } from "../context/Authcontext"
import { Navigate } from "react-router-dom"


const LogOut = () => {
    const {logoutuser}=useContext(AuthContext)

    useEffect(()=>{
        logoutuser()
    },[logoutuser])
  return (
    <Navigate to="/login"/>
  )
}

export default LogOut