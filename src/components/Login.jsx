import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "somthing went wrong");
      console.log("Error in handlelogin : " + err);
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "somthing went wrong");
      console.log("Error in handle signup : " + err);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-[85vh]'>
      <div className='flex w-full justify-center'>
        <div className="card bg-base-300 w-130 shadow-2xl ">
          <div className="card-body">
            <h2 className="card-title justify-center"> {isLoginForm ? "Login" : "Sign Up"} </h2>
            <div>
              {!isLoginForm && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Type here"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Type here"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </>
              )}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="password"
                  className="input  w-full"
                  placeholder="Type here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <p className='text-red-500'>{error}</p>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary px-8" onClick={isLoginForm ? handleLogin : handleSignUp}> {isLoginForm ? "Login" : "Sign Up"} </button>
            </div>
            <p className='m-auto py-5 cursor-pointer' onClick={() => setIsLoginForm(value => !value)}>{isLoginForm ? "New User ? SignUp Here " : "already have an account? Login Here"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
