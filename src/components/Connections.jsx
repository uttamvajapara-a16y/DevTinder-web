// import React, { useEffect } from 'react'
// import axios from "axios";
// import { BASE_URL } from "../utils/constants"
// import { useDispatch, useSelector } from 'react-redux';
// import { addConnections } from "../utils/connectionSlice"
// import { Link } from "react-router-dom"

// const Connections = () => {
//     const connections = useSelector(state => state.connections);
//     const onlineUsers = useSelector(state => state.onlineUsers);
//     const dispatch = useDispatch();

//     const fetchConnections = async () => {
//         try {
//             const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
//             dispatch(addConnections(res?.data?.data))
//         } catch (err) {
//             console.log("Error in fetching Connection : " + err.message);
//         }
//     }

//     useEffect(() => {
//         fetchConnections();
//     }, [])

//     if (!connections) return;

//     if (connections.length === 0) return <p className='text-center text-xl my-10'>No Connections Found</p>

//     return (
//         <div className='text-center my-5 pb-6 pt-5'>
//             <h1 className='text-white font-semibold text-3xl mb-5 tracking-wide'>Connections</h1>
//             {
//                 connections.map((connection) => {
//                     const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
//                     // console.log(_id) ;
//                     return (
//                         <div key={_id} className='flex items-center justify-between w-150 mx-auto mb-5 px-6 py-4 rounded-2xl bg-slate-900/80  border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300'>
//                             <div className='flex items-center gap-5'>
//                                 <div className='relative'>
//                                     <img
//                                         src={photoUrl}
//                                         alt="user Photo"
//                                         className='w-18 h-18 rounded-full object-cover border border-white/10'
//                                     />
//                                     {onlineUsers.includes(_id) && (
//                                         <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
//                                     )}
//                                 </div>
//                                 <div className='text-left max-w-75'>
//                                     <h1 className='text-white text-lg font-semibold'>{firstName + " " + lastName}</h1>
//                                     {gender && age && <p className='text-sm text-slate-400'>{age + " , " + gender}</p>}
//                                     <p className='text-sm text-slate-300 max-w-xs truncate'>{about}</p>
//                                 </div>
//                             </div>
//                             <Link to={"/chat/" + _id}>
//                                 <button className="btn inline-flex items-center justify-center rounded-3xl bg-linear-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110">chat</button>
//                             </Link>

//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default Connections










import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from "../utils/connectionSlice"
import { Link } from "react-router-dom"
import { Users, MessageCircle } from 'lucide-react'

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
                    {connections.map((connection) => (
                        <div
                            key={connection._id}
                            className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/20 hover:border-gray-700 transition-all group flex flex-col"
                        >
                            <div className="relative h-48 bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden">
                                <img
                                    src={connection.photoUrl}
                                    alt={connection.firstNmae}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {onlineUsers.includes(connection._id) && (
                                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                                )}
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {connection.firstName + " " + connection.lastName}
                                </h3>
                                <p className="text-purple-400 font-medium mb-2">
                                    {connection.age && connection.gender && connection.age + "," + connection.gender}
                                </p>

                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                                    <span>{connection.about}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {connection.skills.slice(0, 3).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <button
                                    onClick={() => setSelectedConnection(connection)}
                                    className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Chat
                                </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Connections
