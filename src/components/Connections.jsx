import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from "../utils/connectionSlice"
import {Link} from "react-router-dom"

const Connections = () => {
    const connections = useSelector(state => state.connections);
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
            <h1 className='text-white text-bold text-3xl'>Connections</h1>
            {
                connections.map((connection) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
                    return (
                        <div key={_id} className='flex flex-row justify-between rounded-lg bg-base-300 p-4 w-1/3 m-4 text-left mx-auto'>
                            <div className='flex gap-5'>
                                <div>
                                    <img
                                        src={photoUrl}
                                        alt="user Photo"
                                        className='w-20 h-20 rounded-full '
                                    />
                                </div>
                                <div className='max-w-75'>
                                    <h1 className='font-bold text-xl'>{firstName + " " + lastName}</h1>
                                    {gender && age && <p>{age + " , " + gender}</p>}
                                    <p className='max-h-10 overflow-hidden'>{about}</p>
                                </div>
                            </div>
                            <Link to={"/chat/"+_id}>
                                <button className='btn btn-primary m-5'>chat</button>
                            </Link>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Connections
