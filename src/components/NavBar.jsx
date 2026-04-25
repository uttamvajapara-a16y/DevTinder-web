import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { addRequests } from '../utils/requestsSlice';

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
        <div className="navbar fixed top-0 left-0 right-0 z-50  bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 shadow-lg">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-xl">👩🏻‍💻 DevTinder</Link>
            </div>
            <div className="flex gap-2">
                {user && <div className="dropdown dropdown-end mx-5">
                    <div className='flex gap-2'>
                        <p className='mx-3 my-2 text-white font-medium'>welcome {user.firstName}</p>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar overflow-hidden border border-white/10 cursor-pointer hover:scale-105 transition">
                            <div className="w-10 rounded-full">
                                <img
                                    className='w-full h-full object-cover'
                                    alt="user photo"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content rounded-box z-1 mt-4 w-56 p-2 rounded-xl  bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl text-slate-200">
                        <li className='hover:bg-white/10 rounded-lg transition'>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li className='hover:bg-white/10 rounded-lg transition'><Link to="/connections">Connections</Link></li>
                        <li className='flex justify-between hover:bg-white/10 rounded-lg transition'>

                            <Link to="/requests" className="relative inline-block">Requests
                                {/* {requests && requests.length >= 1 && <p className='text-red-600 text-2xl max-w-5'>•</p>} */}
                                {requests && requests?.length > 0 &&
                                    <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full">
                                </span>}
                            </Link>
                        </li>
                        <li className='hover:bg-white/10 rounded-lg transition'>
                            <Link to="/profile/changePassword" className="justify-between">
                                Change Password
                            </Link>
                        </li>
                        <li className='hover:bg-white/10 rounded-lg transition'><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default NavBar
