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
    <div className='min-h-screen flex items-center justify-center bg-black/80 px-4 py-8'>
      <div className='w-full max-w-sm sm:max-w-md mx-auto'>
        <div className='card w-full bg-base-300/95 shadow-2xl ring-1 ring-slate-800'>
          <div className='card-body gap-5 p-6 sm:p-8'>
            <h2 className='card-title justify-center text-2xl sm:text-3xl'>{isLoginForm ? 'Login' : 'Sign Up'}</h2>
            <div className='space-y-4'>
              {!isLoginForm && (
                <>
                  <fieldset className='fieldset'>
                    <legend className='fieldset-legend'>First Name</legend>
                    <input
                      type='text'
                      className='input w-full'
                      placeholder='Type here'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className='fieldset'>
                    <legend className='fieldset-legend'>Last Name</legend>
                    <input
                      type='text'
                      className='input w-full'
                      placeholder='Type here'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </>
              )}
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Email ID</legend>
                <input
                  type='text'
                  className='input w-full'
                  placeholder='Type here'
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Password</legend>
                <input
                  type='password'
                  className='input w-full'
                  placeholder='Type here'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <p className='min-h-[1.2rem] text-sm text-red-500'>{error}</p>
            <div className='card-actions justify-center mt-2'>
              <button className='btn btn-primary w-full px-6 py-3 text-base sm:px-8' onClick={isLoginForm ? handleLogin : handleSignUp}>
                {isLoginForm ? 'Login' : 'Sign Up'}
              </button>
            </div>
            <p className='text-center text-sm text-slate-500 hover:text-slate-200 cursor-pointer mt-4' onClick={() => setIsLoginForm((value) => !value)}>
              {isLoginForm ? 'New user? Sign up here' : 'Already have an account? Login here'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
