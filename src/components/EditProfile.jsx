import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || 18);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [skills, setSkills] = useState(user?.skills);
  const [error, setError] = useState("");

  const handleEdit = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about , skills}, { withCredentials: true })
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
      <div className='bg-black backdrop-blur-sm flex justify-center gap-5 pb-10'>
        <div className='justify-center my-15 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col'>
          <div className="card bg-[rgb(16,24,40,1)] border border-gray-800 w-130 shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-white text-center tracking-wide">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">First Name</legend>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">Last Name</legend>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">Age</legend>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Type here"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">Gender</legend>
                  <select value={gender} className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 text-white 
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
                    className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Type here"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                    placeholder="e.g., React, Node.js, TypeScript (comma-separated)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Separate skills with commas
                  </p>
                </div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-slate-400 text-sm">About</legend>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Bio">
                  </textarea>
                </fieldset>
              </div>
              <p className='m-auto pt-2 cursor-pointer' onClick={() => navigate("/profile/changePassword")}>change password ?</p>
              <div className="card-actions justify-center mt-4">
                <button className="btn inline-flex items-center justify-center rounded-3xl  px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] border border-white hover:bg-green-600/90 hover:border-geeen-400 text-white transition" onClick={handleEdit}>Save Profile</button>
              </div>
            </div>
          </div>
        </div>

        <div className='my-auto'>
          <UserCard user={{ firstName, lastName, photoUrl, age, about, gender, skills }} isDisabled={true} mauto={false} />
        </div>
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
