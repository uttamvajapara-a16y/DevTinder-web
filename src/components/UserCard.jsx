import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed, addFeed } from '../utils/feedSlice';
import { GraduationCap, Code, X, Heart } from 'lucide-react'

const UserCard = ({ user, isDisabled, mauto }) => {
    const { _id, firstName, lastName, age, about, gender, photoUrl, skills } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));
            const feedRes = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(feedRes?.data));
        } catch (err) {
            console.log("Error in handling send request : " + err.message);
        }
    }

    return (
        <div className={"relative w-full max-w-xs mb-8 hover:z-20 " + (mauto ? "mx-auto" : "")}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="relative h-64 bg-linear-to-br from-gray-800 to-gray-900">
                    <img
                        src={photoUrl}
                        alt="user photo"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h2 className="text-xl font-bold leading-tight mb-1 truncate">
                            {firstName} {lastName}, {age}
                        </h2>
                        <span className="text-sm text-white/80">{gender}</span>
                    </div>
                </div>

                <div className="p-4 bg-gray-900">
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-white mb-1.5 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-purple-400" />
                            About
                        </h3>
                        {/* line-clamp keeps varying bio lengths from blowing up card height */}
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 wrap-break-word">
                            {about}
                        </p>
                    </div>

                    {skills?.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                                <Code className="w-4 h-4 text-pink-400" />
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.slice(0, 6).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2.5 py-1 bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            disabled={isDisabled}
                            onClick={() => handleSendRequest("ignored", _id)}
                            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-pink-500 to-rose-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-pink-500/30 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <X className="w-4 h-4" />
                            IGNORE
                        </button>
                        <button
                            disabled={isDisabled}
                            onClick={() => handleSendRequest("interested", _id)}
                            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-violet-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/30 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <Heart className="w-4 h-4" />
                            INTERESTED
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard