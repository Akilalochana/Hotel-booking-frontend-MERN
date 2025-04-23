import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    console.log("submited")

    axios.post("http://localhost:3000/api/users/login",
      {
      email: email,
      password: password
      }
    ).then((res)=>{
      console.log(res)
      toast.success("Login successful")
      const user  = res.data.user
      
      if(user.role === "admin"){
        window.location.href = "/admin/"
      }else{
        window.location.href = "/"
      }
      
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.error)
    })
  };


  return (
    <div className="min-h-screen bg-[#111] text-[#bbb] flex items-center justify-center">

      <div className="bg-[#1c1c1c] p-8 rounded-2xl shadow-lg w-[400px]">
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

        </form>
      </div>
    </div>
  );
}
