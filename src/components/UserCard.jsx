import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed, addFeed } from '../utils/feedSlice';
import { GraduationCap, Code, X, Heart } from 'lucide-react'

const UserCard = ({ user , isDisabled , mauto}) => {
    const { _id, firstName, lastName, age, about, gender, photoUrl, skills } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));

            // Refetch feed to get more users if needed
            const feedRes = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(feedRes?.data));
        } catch (err) {
            console.log("Error in handling send request : " + err.message);
        }
    }

    return (
        <div className={"h-full w-full max-w-md mb-25 my-15 " + (mauto ? "mx-auto" : "" )} >
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all">
                <div className="relative h-110 bg-linear-to-br from-gray-800 to-gray-900">
                    <img
                        src={photoUrl}
                        alt="user photo"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h2 className="text-3xl font-bold mb-2">
                            {firstName} {lastName}, {age}
                        </h2>
                        <div className="flex items-center gap-2 text-white/90">
                            <span>{gender}</span>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-900">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-purple-400" />
                            About
                        </h3>
                        <p className="text-gray-400 leading-relaxed">{about}</p>
                    </div>
                    {skills?.length > 0 && <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Code className="w-5 h-5 text-pink-400" />
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills?.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>}
                    <div className="flex gap-4">
                        <button
                            disabled={isDisabled}
                            onClick={() => handleSendRequest("ignored", _id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/30 transform hover:scale-105 transition-all border border-red-500/30"
                        >
                            <X className="w-6 h-6" />
                            IGNORE
                        </button>
                        <button
                            disabled={isDisabled}
                            onClick={() => handleSendRequest("interested", _id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-violet-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/30 transform hover:scale-105 transition-all border border-green-500/30"
                        >
                            <Heart className="w-6 h-6" />
                            INTERESTED
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
