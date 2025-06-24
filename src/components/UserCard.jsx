import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user, val }) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about} = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId, {},
        {withCredentials: true}  
      )
      dispatch(removeUserFromFeed(userId))
    } 
    catch (error) {
      console.log("errro in feed card api")
    }
  }
  return (
    <div className="card w-80 bg-green-400 shadow-md mb-4 p-4 rounded-lg">
      <img
        src={user.photoUrl}
        alt={`${user.firstName} ${user.lastName}`}
        className="rounded-xl w-full h-60 object-cover mb-4"
      />
      <div className="text-center">
        <h2 className="text-xl font-semibold">{user.firstName} {user.lastName} : {user.age} </h2>
        <p className="text-sm text-gray-600 my-2">About: {user.about}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {user.skills && user.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}

       {val &&  (<div className="flex justify-center gap-4 mt-4">
         <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => handleSendRequest("interested", _id)}
          >
           Interested
         </button>
       <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
       onClick={() => handleSendRequest("ignored", _id)}
       >
        Ignore
  </button>
    </div>
)}

        </div>
      </div>
    </div>
  );
};

export default UserCard;
