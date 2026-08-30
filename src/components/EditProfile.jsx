import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
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
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [skills, setSkills] = useState(user?.skills);

  const handleEdit = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about, skills }, { withCredentials: true })
      dispatch(addUser(res?.data?.data))
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
      <div className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-2">

        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white text-center tracking-wide mb-4">
            Edit Profile
          </h2>

          <div className="space-y-1">
            <div className="grid grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-400 text-xs">First Name</legend>
                <input
                  type="text"
                  className="w-full px-2 py-2 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-400 text-xs">Last Name</legend>
                <input
                  type="text"
                  className="w-full px-2 py-2 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-400 text-xs">Age</legend>
                <input
                  type="number"
                  className="w-full px-2 py-2 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                  placeholder="Type here"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-400 text-xs">Gender</legend>
                <select
                  value={gender}
                  className="w-full px-2 py-2 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>Select</option>
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-slate-400 text-xs">Photo URL</legend>
              <input
                type="text"
                className="w-full px-2 py-2 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                placeholder="Type here"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-slate-400 text-xs">Skills</legend>
              <input
                type="text"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
                className="w-full px-2 py-2 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition text-white placeholder-gray-500"
                placeholder="e.g., React, Node.js, TypeScript (comma-separated)"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-slate-400 text-xs">About</legend>
              <textarea
                rows={2}
                className="w-full px-2 py-2 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Bio"
              />
            </fieldset>
          </div>

          <p
            className="text-center text-sm text-slate-400 hover:text-violet-400 pt-4 cursor-pointer transition"
            onClick={() => navigate("/profile/changePassword")}
          >
            Change password?
          </p>

          <div className="flex justify-center mt-4">
            <button
              className="inline-flex items-center justify-center rounded-3xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] border border-white hover:bg-green-600/90 hover:border-green-400 text-white transition"
              onClick={handleEdit}
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Preview card, vertically centered against the form via the parent's items-center */}
        <div className="flex items-center justify-center">
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
