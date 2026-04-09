import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {
  // console.log(user)
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || 18);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleEdit = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about }, { withCredentials: true })
      dispatch(addUser(res?.data?.data))
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000)
    } catch (err) {
      setError(err)
      console.log("Error in handleEdit : " + err.message);
    }
  }

  return (
    <>
      <div className='flex justify-center gap-5'>
        <div className='flex justify-center my-10'>
          <div className="card bg-base-300 w-130 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
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
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Type here"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <select className="select w-full" onChange={(e) => setGender(e.target.value)}>
                    <option disabled: true>Select Gender</option>
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">PhotoUrl</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Type here"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  {/* <input
                    type="text"
                    className="input w-full"
                    placeholder="Type here"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  /> */}
                  <textarea 
                    className="textarea w-full" 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)} 
                    placeholder="Bio">
                  </textarea>
                </fieldset>
              </div>
              <p className='text-red-500'>{error}</p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary px-8" onClick={handleEdit}>Save Profie</button>
              </div>
            </div>
          </div>
        </div>

        <UserCard user={{ firstName, lastName, photoUrl, age, about, gender }} />

      </div>
      <div className="toast toast-top toast-center">
        {showToast && <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>}
      </div>
    </>
  )
}

export default EditProfile
