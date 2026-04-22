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
        fetchRequests() ;
    }, [])

    return (
        <div className="navbar bg-base-300 shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-xl">👩🏻‍💻 DevTinder</Link>
            </div>
            <div className="flex gap-2">
                {user && <div className="dropdown dropdown-end mx-5">
                    <div className='flex gap-2'>
                        <p className='mx-3 my-2'>welcome {user.firstName}</p>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user photo"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-5 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to="/connections">Connections</Link></li>
                        <li className='flex justify-between'>

                            <Link to="/requests">Requests
                                {requests && requests.length >= 1 && <p className='text-red-600 text-2xl max-w-5'>•</p>}
                            </Link>
                        </li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default NavBar
