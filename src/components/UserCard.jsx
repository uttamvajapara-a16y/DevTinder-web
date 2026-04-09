import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, age, about, gender, photoUrl, skills } = user;
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
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
