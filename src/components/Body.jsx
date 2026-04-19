import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios  from "axios" ;
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;
  const userData = useSelector(state => state.data) ;

  const fetchUser = async () => {
    if(userData) {
      return navigate("/feed") ;
    } ;
    
    try{
      const res = await axios.get(BASE_URL + "/profile/view" , {withCredentials : true}) ;
      dispatch(addUser(res.data)) ;
    } catch (err) {
      if(err.status === 401){
        navigate("/login") ;
      }
      console.log("Error in fetching user: " + err.message) ;
    }
  }

  useEffect(() => {
    fetchUser() ;
  } , [])

  return (
    <div className='pt-8 pb-10'>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
