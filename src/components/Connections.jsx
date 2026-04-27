import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux';
import { addConnections, removeConnections } from "../utils/connectionSlice"
import { Link } from "react-router-dom"
import { Users, MessageCircle, X } from 'lucide-react'

const Connections = () => {
    const connections = useSelector(state => state.connections);
    const onlineUsers = useSelector(state => state.onlineUsers);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res?.data?.data))
        } catch (err) {
            console.log("Error in fetching Connection : " + err.message);
        }
    }

    const handleRemoveConnection = async (connectionId) => {
        try{
            const res = await axios.delete(BASE_URL + "/user/removeConnection/" + connectionId , { withCredentials: true });
            // console.log(res)
            dispatch(removeConnections(connectionId))
        } catch (err) {
            console.log("Error in removing connection : " + err.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if (!connections) return;

    if (connections.length === 0) return <p className='text-center text-xl my-10'>No Connections Found</p>

    return (
        <div className="min-h-[calc(100vh-128px)] py-8 px-4 bg-black mb-15 mt-5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
                        <Users className="w-10 h-10 text-purple-400" />
                        Your Connections
                    </h1>
                    <p className="text-gray-400">
                        {connections.length} developer{connections.length !== 1 ? "s" : ""} connected
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connections.map((connection) => {
                        const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection.data;

                        return(<div
                            key={connection._id}
                            className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/20 hover:border-gray-700 transition-all group flex flex-col"
                        >
                            {/* {console.log(connection)} */}
                            <div className="relative h-48 bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden">
                                <img
                                    src={photoUrl}
                                    alt={firstName}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <button className='absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-500 transition-colors shadow-md' onClick={() => {handleRemoveConnection(connection._id)}}>
                                    <X className='w-5 h-5'/>
                                </button>
                                {onlineUsers.includes(_id) && (
                                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                                )}
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {firstName + " " + lastName}
                                </h3>
                                <p className="text-purple-400 font-medium mb-2">
                                    {age && gender && age + "," + gender}
                                </p>

                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                                    <span>{about}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {skills?.slice(0, 3).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <Link to={"/chat/" + connection._id}>
                                        <button
                                            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            Chat
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div> )
})}
                </div>
            </div>
        </div>
    )
}

export default Connections
