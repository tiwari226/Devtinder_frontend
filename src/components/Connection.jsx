import React, { useEffect } from 'react'
import axios from 'axios'
import {BASE_URL} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {addConnections} from "../utils/connectionsSlice"

const Connection = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections",  {
            withCredentials: true,
    });
   //  console.log(res.data.data);
    dispatch(addConnections(res.data.data))
         
        } catch (error) {
           console.log("error in connection api");
        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);
    
    if(!connections) return;
    if(connections.lenght === 0) return <h1> No Connection Found!! </h1>

  return (
  <div className=" bg-slate-300 min-h-screen">  
    <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Your Connections</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connections.map((connection, index) => {
                    const { firstName, lastName, photoUrl, age, gender, about, skills } = connection;
                    
                    return (
                        
                        <div key={index} className="bg-pink-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            {/* Profile Header */}
                            <div className="flex items-center p-4 border-b">
                                <img 
                                    src={photoUrl || 'https://via.placeholder.com/150'} 
                                    alt={`${firstName} ${lastName}`}
                                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                                <div className="ml-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {firstName} {lastName}
                                    </h2>
                                    <p className="text-gray-600">
                                        {age} • {gender}
                                    </p>
                                </div>
                            </div>
                            
                            {/* About Section */}
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-500 mb-1">ABOUT :</h3>
                                <p className="text-gray-700 mb-4 line-clamp-3">
                                    {about || "No description provided"}
                                </p>
                                
                                {/* Skills Section */}
                                <h3 className="text-sm font-semibold text-gray-500 mb-2">SKILLS : </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills?.length > 0 ? (
                                        skills.map((skill, i) => (
                                            <span 
                                                key={i}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 text-sm">No skills listed</span>
                                    )}
                                </div>
                            </div>
                        </div>
                         
                     );

                })}
            </div>
        </div>
  </div>
  )
}

export default Connection