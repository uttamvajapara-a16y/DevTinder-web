import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const { _id , firstName, lastName, age, about, gender, photoUrl, skills } = user;
    const dispatch = useDispatch() ;

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId , {} , {withCredentials: true});
            dispatch(removeUserFromFeed(userId)) ;
        } catch (err) {
            console.log("Error in handling send request : " + err.message);
        }
    }

    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    {photoUrl && <img
                        src={photoUrl}
                        alt="user photo"
                        className='w-96 h-90'
                    />}
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + " " + gender}</p>}
                    {about && <p>{about}</p>}
                    <div className="card-actions justify-center my-3">
                        <button className="btn btn-primary" onClick={() => handleSendRequest("ignored" , _id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested" , _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
