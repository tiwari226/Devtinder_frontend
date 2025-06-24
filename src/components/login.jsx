import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // Signup only
  const [lastName, setLastName] = useState(""); // Signup only
  const [log, setLog] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(
          BASE_URL + "/login",
          { emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/");
      } else {
        const res = await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data.data));
        navigate("/profile");
      }
    } catch (error) {
      setLog(error?.response?.data || "An error occurred.");
    }
  };

 return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-400 flex items-center justify-center">
        <div className="card w-full max-w-md shadow-xl bg-blue-300 mb-40">
          <form className="card-body">
            <h2 className="card-title text-2xl mb-4 justify-center">
              {isLogin ? "Login" : "Signup"}
            </h2>
            {!isLogin && (
              <>
                <div className="form-control mx-10">
                  <label>
                    <span className='text-black text-lg'>First Name :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mx-10 mt-2">
                  <label>
                    <span className='text-black text-lg'>Last Name :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="form-control mx-10 mt-4">
              <label>
                <span className='text-black text-lg'>Email :</span>
              </label>
              <input
                type="email"
                placeholder="Enter your Email..."
                className="input input-bordered"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4 mx-4 px-6">
              <label>
                <span className='text-black text-lg'>Password :</span>
              </label>
              <input
                type = "password"
                placeholder="*********"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-red-800 text-sm mt-2 text-center">{log}</p>
            <div className="form-control mt-4 flex items-center">
              <button
                type="button"
                className="btn btn-primary w-1/3 mx-24"
                onClick={handleSubmit}
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-800 mt-2 underline rounded-lg"
              > 
                {isLogin ? "Don't Account : Sign up" : "already account : Login"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
