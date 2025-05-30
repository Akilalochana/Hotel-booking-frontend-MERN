import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin(
    {
      onSuccess:(res)=>{
        console.log(res)
        axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/users/google`,{
          accesToken : res.access_token
        }).then((res)=>{
            console.log(res)
            toast.success("Login successful")
            const user  = res.data.user
            localStorage.setItem("token", res.data.token)
            if(user.role === "admin"){
              navigate("/admin/")
            }else{
              navigate("/");
            }
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
  )
  const backendUrl = import.meta.env.VITE_BACKEND_HOST_URL
 

  function handleSubmit(e){
    e.preventDefault();
    console.log("submited")

    axios.post(`${backendUrl}/api/users/login`,
      {
      email: email,
      password: password
      }
    ).then((res)=>{
      console.log(res)

      toast.success("Login successful")
      const user  = res.data.user
      localStorage.setItem("token", res.data.token)
      
      if(user.role === "admin"){
        navigate("/admin/")
      }else{
        navigate("/");
      }

    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  };


  return (
    <div className="min-h-screen bg-picture text-[#bbb] flex items-center justify-center">

      <div className="bg-black/70 p-8 rounded-2xl shadow-lg md:w-[400px] w-[350px]">
        <div className="flex flex-col items-center mb-6">

          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="w-20 h-20 mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-white">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="you@gmail.com"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#53c28b] hover:bg-[#53c28b70] text-white font-medium py-3 rounded-md transition" 
          >
            Login
          </button>

            <button
            type="submit"
            className="w-full bg-[#53c28b] hover:bg-[#53c28b70] text-white font-medium py-3 rounded-md transition" onClick={googleLogin}
          >
            Login with google
          </button>

        </form>
      </div>
    </div>
  );
}
