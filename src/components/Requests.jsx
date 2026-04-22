import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from "../utils/requestsSlice"

const Requests = () => {
    const requests = useSelector(state => state.requests);
    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            // console.log(res) ;
            dispatch(addRequests(res?.data?.data));
        } catch (err) {
            console.log("Error in fetching requests : " + err.message);
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id))
        } catch (err) {
            console.log("Error in review request : " + err.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!requests) return;
    if (requests.length === 0) return <p className='text-center my-10 text-xl'>No Requests Found</p>

    return (
        <div className='text-center py-8'>
            <h1 className='text-white font-semibold text-3xl mb-8 tracking-wide'>
                Connection Requests
            </h1>
            {requests.map((request) => {

                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                return (
                    <div
                        key={_id}
                        className='flex items-center justify-between w-162.5 mx-auto mb-5 px-6 py-4 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
                    >
                        <div className='flex items-center gap-5'>
                            <img
                                src={photoUrl}
                                alt="user"
                                className='w-16 h-16 rounded-full object-cover border border-white/10'
                            />
                            <div className='text-left max-w-xs'>
                                <h1 className='text-white text-lg font-semibold'>{firstName + " " + lastName}</h1>
                                {gender && age && (<p className='text-sm text-slate-400'>{age} , {gender}</p>)}
                                <p className='text-sm text-slate-300 truncate'>{about}</p>
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <button
                                className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-pink-500 to-rose-500 hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-md shadow-pink-500/30"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                Reject
                            </button>
                            <button
                                className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-violet-500 hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-md shadow-violet-500/30"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Requests
