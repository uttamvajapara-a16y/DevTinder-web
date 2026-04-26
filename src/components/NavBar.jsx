import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { addRequests } from '../utils/requestsSlice';
import { Sparkles, Users, UserPlus, User, LogOut, Code2 } from 'lucide-react'

function NavBar() {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const requests = useSelector(store => store.requests);

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            console.log("Error in Logout : " + err.message);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            // console.log(res) ;
            dispatch(addRequests(res?.data?.data));
        } catch (err) {
            console.log("Error in fetching requests : " + err.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    return (
        <div className="navbar fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-xl border-b border-gray-700 px-6 shadow-lg">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-xl">
                    <div className="p-2 rounded-lg">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                    Dev-Tinder
                </Link>
            </div>
            <div className='flex gap-5 mr-15 justify-center text-lg'>
                <div>
                    <NavLink to="/feed" className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                        <Sparkles className="w-5 h-5" />
                        <span className="hidden sm:inline">Feed</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/connections" className={({ isActive }) => `flex gap-2 items-center px-4 py-2 rounded-lg transition-all ${isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                        <Users className="w-5 h-5" />
                        <span className="hidden sm:inline">Connections</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/requests" className={({ isActive }) => `flex gap-2 relative items-center px-4 py-2 rounded-lg transition-all ${isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                        <UserPlus className="w-5 h-5" />
                        <span className="hidden sm:inline">Requests</span>
                        {requests && requests?.length > 0 &&
                            <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full">
                            </span>}
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/profile" className={({ isActive }) => `flex gap-2 items-center px-4 py-2 rounded-lg transition-all ${isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                        <User className="w-5 h-5" />
                        <span className="hidden sm:inline">Profile</span>
                    </NavLink>
                </div>
                <div>
                    <p className='flex gap-2 items-center px-4 py-2 rounded-lg transition-all text-gray-400 hover:text-white hover:bg-gray-800 text-lg' onClick={handleLogout}>
                        <LogOut className="w-5 h-5" />
                        <span className="hidden sm:inline">Logout</span>
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                {user && <div className="dropdown dropdown-end mx-5">
                    <div className='flex gap-2'>
                        <p className='mx-3 my-2 text-white font-medium'>welcome {user.firstName}</p>
                        <div role="button" className="btn btn-ghost btn-circle avatar overflow-hidden border border-white/10 cursor-pointer hover:scale-105 transition">
                            <div className="w-10 rounded-full">
                                <img
                                    className='w-full h-full object-cover'
                                    alt="user photo"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default NavBar
