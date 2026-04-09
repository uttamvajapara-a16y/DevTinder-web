import React, { useEffect, useState } from 'react'
import UserCard from "./UserCard";
import { BASE_URL } from '../utils/constants';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data)) ;
    } catch (err) {
      console.log("error in fetching feed : "+ err.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])

  return (
    feed && <div>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed
