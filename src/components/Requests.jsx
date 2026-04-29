import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from "../utils/requestsSlice"
import { UserPlus } from 'lucide-react'

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
    if (requests.length === 0) return <p className='min-h-[80vh] text-center my-10 text-xl'>No Requests Found</p>

    return (
        <div className="min-h-[calc(100vh-128px)] py-8 px-4 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
                        <UserPlus className="w-10 h-10 text-pink-400" />
                        Connection Requests
                    </h1>
                    <p className="text-gray-400">
                        {requests?.length} pending request{requests.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <div>
                    {requests.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto">
                                <Code className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    No pending requests
                                </h2>
                                <p className="text-gray-400">
                                    You're all caught up! Check back later for new requests.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {
                                requests.map((request) => {

                                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                                    return (
                                        <div
                                            key={_id}
                                            className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/20 hover:border-gray-700 transition-all"
                                        >
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="relative w-full sm:w-48 h-64 sm:h-auto bg-linear-to-br from-gray-800 to-gray-900 shrink-0">
                                                    <img
                                                        src={photoUrl}
                                                        alt="user"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-2 right-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                        {(() => {
                                                            const diff = Math.floor((new Date() - new Date(request.createdAt)) / 1000);
                                                            if (diff < 60) return `${diff}s ago`;
                                                            if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
                                                            if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
                                                            if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
                                                            return `${Math.floor(diff / 2592000)}mo ago`;
                                                        })()}
                                                    </div>
                                                </div>
                                                <div className="p-5 flex-1 flex flex-col">
                                                    <h3 className="text-2xl font-bold text-white mb-1">{firstName + " " + lastName}</h3>
                                                    {gender && age && (<p flex items-center gap-2 text-gray-400 text-sm mb-3>{age} , {gender}</p>)}
                                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{about}</p>


                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {request?.skills?.slice(0, 4).map((skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-medium"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex gap-3 mt-auto">
                                                        <button
                                                            className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-pink-500 to-rose-500 hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-md shadow-pink-500/30"
                                                            onClick={() => reviewRequest("rejected", request._id)}
                                                        >
                                                            Reject
                                                        </button>
                                                        <button
                                                            className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-violet-500 hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-md shadow-violet-500/30"
                                                            onClick={() => reviewRequest("accepted", request._id)}
                                                        >
                                                            Accept
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Requests
