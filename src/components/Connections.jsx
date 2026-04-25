import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from "../utils/connectionSlice"
import { Link } from "react-router-dom"

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
        <div className='text-center my-5 pb-6 pt-5'>
            <h1 className='text-white font-semibold text-3xl mb-5 tracking-wide'>Connections</h1>
            {
                connections.map((connection) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
                    // console.log(_id) ;
                    return (
                        <div key={_id} className='flex items-center justify-between w-150 mx-auto mb-5 px-6 py-4 rounded-2xl bg-slate-900/80  border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300'>
                            <div className='flex items-center gap-5'>
                                <div className='relative'>
                                    <img
                                        src={photoUrl}
                                        alt="user Photo"
                                        className='w-18 h-18 rounded-full object-cover border border-white/10'
                                    />
                                    {onlineUsers.includes(_id) && (
                                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                                    )}
                                </div>
                                <div className='text-left max-w-75'>
                                    <h1 className='text-white text-lg font-semibold'>{firstName + " " + lastName}</h1>
                                    {gender && age && <p className='text-sm text-slate-400'>{age + " , " + gender}</p>}
                                    <p className='text-sm text-slate-300 max-w-xs truncate'>{about}</p>
                                </div>
                            </div>
                            <Link to={"/chat/" + _id}>
                                <button className="btn inline-flex items-center justify-center rounded-3xl bg-linear-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110">chat</button>
                            </Link>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Connections
