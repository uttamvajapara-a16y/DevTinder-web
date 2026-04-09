import React, { useState } from 'react' ;
import axios from "axios" ;
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("anushka@gmail.com");
  const [password, setPassword] = useState("Anushka@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  
const handleLogin = async () => {
  try{
    const res = await axios.post(BASE_URL + "/login", { emailId, password } , {withCredentials: true});
    dispatch(addUser(res.data)) ;
    navigate("/feed") ;
  } catch (err) {
    setError(err?.response?.data || "somthing went wrong") ;
    console.log("Error in handlelogin : "+err) ;
  }
}
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-130 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input 
                w-full"
                placeholder="Type here"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input  
                w-full"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary px-8" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
