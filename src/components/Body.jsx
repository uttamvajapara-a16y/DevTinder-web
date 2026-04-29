import React, { useEffect, useRef } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import createSocketConnection from '../utils/socket';
import { addOnlineUser } from '../utils/onlineUserSlice';

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.data);
  const user = useSelector((store) => store.user);
  const socketRef = useRef(null);

  const fetchUser = async () => {
    if (user) {
      return navigate("/feed");
    };

    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log("Error in fetching user: " + err.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    if (!user?._id) return;

    socketRef.current = createSocketConnection();
    socketRef.current.emit("userOnline", user._id);

    socketRef.current.on("onlineUsers", (onlineUsers) => {
      dispatch(addOnlineUser(onlineUsers));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user?._id, dispatch])

  return (
    <div className='min-h-screen pt-10 bg-black/80'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
