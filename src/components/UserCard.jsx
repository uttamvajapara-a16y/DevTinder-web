import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed, addFeed } from '../utils/feedSlice';

const UserCard = ({ user , isDisabled}) => {
    const { _id , firstName, lastName, age, about, gender, photoUrl, skills } = user;
    const dispatch = useDispatch() ;

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId , {} , {withCredentials: true});
            dispatch(removeUserFromFeed(userId)) ;

            // Refetch feed to get more users if needed
            const feedRes = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(feedRes?.data));
        } catch (err) {
            console.log("Error in handling send request : " + err.message);
        }
    }

    return (
        <div className='flex justify-center items-center my-10 '>
            <div className="card w-96 shadow-sm bg-slate-950 rounded-3xl">
                <div className='flex justify-center items-center pt-7 w-full max-h-100'>
                    <figure className="w-80 h-80 object-cover object-center overflow-hidden bg-gray-800 rounded-3xl transition-transform duration-700 hover:scale-110">
                    {photoUrl && <img
                        src={photoUrl}
                        alt="user photo"
                        // className='h-40 w-40 rounded-full border-4 border-white/10 object-cover shadow-xl shadow-violet-500/20 transition duration-500 hover:scale-105'
                        className='w-full h-full object-cover object-center'
                    />}
                </figure>
                </div>
                <div className="card-body space-y-5 p-6 text-slate-200">
                    <h2 className="mt-3 text-3xl font-semibold text-white">{firstName} {lastName}</h2>
                    {age && gender && <p className="mt-2 text-sm text-slate-400">{`${age} years • ${gender}`}</p>}
                    {about && <p className='wrap-break-word whitespace-normal text-justify text-sm leading-6 text-slate-200'>{about}</p>}
                    {skills?.length > 0 && (
                        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                            <h3 className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="rounded-full border border-slate-700 bg-white/5 px-3 py-1 text-xs text-slate-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="card-actions justify-center my-3 grid gap-3 sm:grid-cols-2">
                        <button disabled={isDisabled} className="btn inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-violet-400 hover:bg-violet-500/10" onClick={() => handleSendRequest("ignored" , _id)}>Ignore</button>
                        <button disabled={isDisabled} className="btn inline-flex items-center justify-center rounded-3xl bg-linear-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110" onClick={() => handleSendRequest("interested" , _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard