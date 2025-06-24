import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      // Safely extract users array from any format
      const users = res.data?.data || res.data?.users || res.data || [];

      dispatch(addFeed(users));
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };
  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, []);

  if(!feed) return 
  if(feed.length == 0) return <h1 className='text-center my-6 text-2xl'> No more user found !!!!! </h1>

  return (
    <div className="flex flex-col items-center p-16 bg-stone-400 min-h-screen">
       {feed && feed.length > 0 ? (
      <UserCard user={feed[0]}  val = {true}/>
   ) : (
  <p>Loading user...</p>
)}

      
    </div>
  );
};

export default Feed;
