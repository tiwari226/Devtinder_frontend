import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {

    try {
       await axios.post(BASE_URL + "/logout", {} , {withCredentials: true});
       dispatch(removeUser());
       navigate("/login");
    } 
    catch (error) {
      console.log("some errro for logout");
    }
  }
  return (
    <>
    <div className="navbar bg-slate-500 h-24">
    <div className="flex-1">
    <Link to = "/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-10 p-16 ">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
   { user && (<div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Photo"
            src = {user.photoUrl}/>
         </div>
         </div> 
         <p className='text-white'> Welcome {user.firstName}</p>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-2 w-36 p-2 shadow">
        <li>
          <Link to ="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to = "/connections">Connections</Link></li>
        <li><Link to = "/requests">Requests got</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
   ) } 
   
  </div>
</div>
    </>
  )
}

export default Navbar