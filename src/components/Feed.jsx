import React, { useEffect, useRef, useState } from 'react'
import UserCard from "./UserCard";
import { BASE_URL } from '../utils/constants';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import createSocketConnection from '../utils/socket';
import { addOnlineUser } from '../utils/onlineUserSlice';

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const user = useSelector(store => store.user) ;
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log("error in fetching feed : " + err.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = createSocketConnection();
    socketRef.current.emit("userOnline", user?._id);

    socketRef.current.on("onlineUsers", (onlineUsers) => {
      dispatch(addOnlineUser(onlineUsers));
    })
  }, [dispatch])

  if (!feed) return;
  if (feed.length === 0) return <p className='min-h-[80vh] text-center text-xl my-10'>No New User Found</p>

  return (
    feed && <div className='mt-14'>
      <UserCard user={feed[0]} mauto={true} />
    </div>
  )
}

export default Feed
