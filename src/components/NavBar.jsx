import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { addRequests } from '../utils/requestsSlice';
import { Sparkles, Users, UserPlus, User, LogOut, Code2, Menu, X } from 'lucide-react'

function NavBar() {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const requests = useSelector(store => store.requests);
    const [menuOpen, setMenuOpen] = useState(false);

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
    }, [user])

    const navLinks = user ? [
        { to: "/feed", icon: <Sparkles className="w-5 h-5" />, label: "Feed" },
        { to: "/connections", icon: <Users className="w-5 h-5" />, label: "Connections" },
        { to: "/requests", icon: <UserPlus className="w-5 h-5" />, label: "Requests", badge: requests?.length > 0 },
        { to: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    ] : [];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-xl border-b border-gray-700 shadow-lg">
            <div className="navbar px-6">
                <div className="flex-1">
                    <Link to="/feed" className="btn btn-ghost text-xl">
                        <div className="p-2 rounded-lg bg-linear-to-r from-indigo-500 to-violet-500">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <span style={{ fontFamily: "'Pacifico', cursive" }} className="bg-linear-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent text-2xl">
                            Dev-Tinder
                        </span>
                    </Link>
                </div>
            {user && <div className='hidden md:flex gap-5 mr-15 justify-center text-lg'>
                <div className='hover:scale-110 transition duration-300'>
                    <NavLink to="/feed" className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                        <Sparkles className="w-5 h-5" />
                        <span className="hidden sm:inline">Feed</span>
                    </NavLink>
                </div>
                <div className='hover:scale-110 transition duration-300'>
                    <NavLink to="/connections" className={({ isActive }) => `flex gap-2 items-center px-4 py-2 rounded-lg transition-all ${isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                        <Users className="w-5 h-5" />
                        <span className="hidden sm:inline">Connections</span>
                    </NavLink>
                </div>
                <div className='hover:scale-110 transition duration-300'>
                    <NavLink to="/requests" className={({ isActive }) => `flex gap-2 relative items-center px-4 py-2 rounded-lg transition-all ${isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                        <UserPlus className="w-5 h-5" />
                        <span className="hidden sm:inline">Requests</span>
                        {requests && requests?.length > 0 &&
                            <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full">
                            </span>}
                    </NavLink>
                </div>
                <div className='hover:scale-110 transition duration-300'>
                    <NavLink to="/profile" className={({ isActive }) => `flex gap-2 items-center px-4 py-2 rounded-lg transition-all ${isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                        <User className="w-5 h-5" />
                        <span className="hidden sm:inline">Profile</span>
                    </NavLink>
                </div>
                <div className='hover:scale-110 transition duration-300'>
                    <p className='cursor-pointer flex gap-2 items-center px-4 py-2 rounded-lg transition-all text-gray-400 hover:text-white hover:bg-gray-800 text-lg' onClick={handleLogout}>
                        <LogOut className="w-5 h-5" />
                        <span className="hidden sm:inline">Logout</span>
                    </p>
                </div>
            </div>}
                <div className="flex gap-2 items-center">
                    {user && (
                        <>
                            <div className="hidden md:flex gap-2 items-center">
                                <p className='mx-3 my-2 text-white font-medium'>welcome {user.firstName}</p>
                                <div role="button" className="btn btn-ghost btn-circle avatar overflow-hidden border border-white/10 cursor-pointer hover:scale-110 transition">
                                    <div className="w-10 rounded-full" onClick={() => navigate("/profile")}>
                                        <img className='w-full h-full object-cover' alt="user photo" src={user.photoUrl} />
                                    </div>
                                </div>
                            </div>
                            <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(o => !o)}>
                                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {user && menuOpen && (
                <div className="md:hidden flex flex-col px-4 pb-4 gap-1 border-t border-gray-700">
                    <div className="flex items-center gap-3 py-3 border-b border-gray-700">
                        <img className='w-8 h-8 rounded-full object-cover' alt="user photo" src={user.photoUrl} />
                        <p className='text-white font-medium'>welcome {user.firstName}</p>
                    </div>
                    {navLinks.map(({ to, icon, label, badge }) => (
                        <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => `flex gap-3 items-center px-4 py-3 rounded-lg transition-all relative ${
                                isActive ? "bg-linear-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 text-white border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-gray-800"
                            }`}>
                            {icon} {label}
                            {badge && <span className="w-2 h-2 bg-red-500 rounded-full ml-auto" />}
                        </NavLink>
                    ))}
                    <button onClick={() => { setMenuOpen(false); handleLogout(); }}
                        className="flex gap-3 items-center px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default NavBar

































// Cursive / Handwritten

// Pacifico — smooth, friendly, rounded

// Dancing Script — elegant, flowing cursive

// Satisfy — clean, stylish handwriting

// Righteous — bold, retro feel

// Modern / Tech

// Orbitron — futuristic, sci-fi, great for tech apps

// Exo 2 — modern, geometric, very readable

// Rajdhani — sharp, clean, tech-oriented

// Oxanium — minimal, modern, developer-friendly

// Bold / Display

// Bebas Neue — tall, bold, impactful

// Russo One — strong, solid, game-like

// Audiowide — techy, bold, great for dev tools

// Bungee — chunky, eye-catching

// Elegant / Premium

// Cinzel — luxury, serif, premium feel

// Playfair Display — editorial, sophisticated

// Cormorant Garamond — refined, classy

// My recommendation for DevTinder specifically:

// Orbitron — fits the developer/tech theme perfectly

// Audiowide — modern tech feel, very readable

// Exo 2 — clean and professional

// Want me to apply any of these?