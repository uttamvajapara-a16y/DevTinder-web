import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';

const PasswordChange = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            if (newPassword !== confirmNewPassword) {
                setError("New Password and Confirm New Password must be same");
            }
            await axios.patch(BASE_URL + "/profile/changePassword", { oldPassword, newPassword }, { withCredentials: true });
            toast.success('Password Changed successfully.', {
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
            setOldPassword("")
            setNewPassword("")
            setConfirmNewPassword("");
        } catch (err) {
            const errMsg = err?.response?.data || "something went wrong";
            {!error && toast.error(errMsg, {
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
            });}
        }
    }
    return (
        <div className='flex justify-center my-25'>
            <div className="card bg-base-300 w-130 shadow-xl">
                <div className="card-body">
                    <p className='text-red-600 text-center'>{error}</p>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-slate-400 text-sm">Old Password</legend>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                                placeholder="Type here"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-slate-400 text-sm">New Password</legend>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                                placeholder="Type here"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-slate-400 text-sm">Confirm New Password</legend>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                                placeholder="Type here"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center mt-4">
                        <button className="btn inline-flex items-center justify-center rounded-3xl bg-linear-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110" onClick={handleSubmit}>Change Password</button>
                    </div>
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
        </div>
    )
}

export default PasswordChange