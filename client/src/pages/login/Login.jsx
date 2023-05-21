import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [cred,setCred]=useState(
        {
            username:undefined,
            password:undefined
        }
    )
    const {user,loading,error,dispatch}=useContext(AuthContext)
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setCred(prev=>({...prev,[e.target.id]:e.target.value}))
    }

    const handleClick=async e=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res=await axios.post("/auth/login", cred);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate("/")
        }catch(err)
        {
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }

    }
console.log(user);
    return <div className="login" >
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput"/>
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput"/>
        <button disabled={loading} className="lButton" onClick={handleClick}>Login</button>
        {error && <span>{error.message}</span>}
    </div>
}
export default Login;