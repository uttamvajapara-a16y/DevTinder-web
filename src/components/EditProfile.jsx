import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from '@reduxjs/toolkit';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || 18);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");

  const handleEdit = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about }, { withCredentials: true })
      dispatch(addUser(res?.data?.data))
      setError("");
      toast.success('Profile saved successfully.', {
        toastId: nanoid(),
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
      const errMsg = err?.response?.data || "somthing went wrong";
      setError(errMsg);
      toast.error(errMsg, {
        toastId: nanoid(),
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log("Error in handleEdit : " + err.message);
    }
  }

  return (
    <>
      <div className='flex justify-center gap-5 overflow-hidden'>
        <div className='flex justify-center my-10'>
          <div className="card bg-base-200 w-130 shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-white text-center tracking-wide">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">First Name</legend>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">Last Name</legend>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">Age</legend>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Type here"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">Gender</legend>
                  <select value={gender} className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white 
                     focus:outline-none focus:ring-2 focus:ring-violet-500 transition" onChange={(e) => setGender(e.target.value)}>
                    <option disabled={true}>Select Gender</option>
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">PhotoUrl</legend>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Type here"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">About</legend>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Bio">
                  </textarea>
                </fieldset>
              </div>
              <div className="card-actions justify-center mt-4">
                <button className="btn inline-flex items-center justify-center rounded-3xl bg-linear-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110" onClick={handleEdit}>Save Profile</button>
              </div>
            </div>
          </div>
        </div>

        <UserCard user={{ firstName, lastName, photoUrl, age, about, gender }} isDisabled={true} />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}

export default EditProfile
