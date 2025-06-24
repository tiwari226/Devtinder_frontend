import React, { useEffect } from 'react'
import {BASE_URL} from "../utils/constants"
import axios  from 'axios'
import {useDispatch, useSelector} from "react-redux";
import { addRequests, removeRequest } from '../utils/requestSlice';

const Request = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest =  async(status, _id) => {
      try {
        const res = await axios.post(
          BASE_URL + "/request/review/" + status + "/" + _id,
          {},
          {withCredentials: true}
        );
      dispatch(removeRequest(_id));
      } catch (error) {
        console.log("review api not call");
      }
    }
    const fetchRequests = async() => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved", {
                withCredentials: true,
            })
        dispatch(addRequests(res.data.data));
        console.log(res?.data?.data);
        } catch (error) {
           console.log("fetced error");
        }
    }

    useEffect(() => {
      fetchRequests();
    }, []);
 if (!requests) {
    return <div className="text-center py-8">Loading...</div>;
  }
  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-600">No pending requests</h2>
        <p className="text-gray-500 mt-2">You don't have any connection requests yet</p>
      </div>
    );
  }
  return (
    <div className='bg-slate-300 min-h-screen'>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Connection Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => {
          const user = request.fromUserId; 

          return (
            <div key={request._id} className="rounded-xl shadow-md overflow-hidden border border-gray-200 bg-blue-300">
              
              {/* Request Header */}
              <div className="flex items-center p-4 border-b">
                <img
                  src={user.photoUrl || 'https://via.placeholder.com/150'}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-14 w-14 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Wants to connect with you
                  </p>
                </div>
              </div>

              {/* Request Message + Buttons */}
              <div className="p-4">
                {request.message && (
                  <p className="text-gray-600 mb-4 italic">
                    "{request.message}"
                  </p>
                )}

                <div className="flex space-x-3">
                  <button className="flex-1 bg-pink-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
                  onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button className="flex-1 bg-gray-300 hover:bg-gray-500 text-gray-800 py-2 px-4 rounded-lg transition"
                  onClick={() => reviewRequest("rejected", request._id)}
                  >
                  Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};
export default Request