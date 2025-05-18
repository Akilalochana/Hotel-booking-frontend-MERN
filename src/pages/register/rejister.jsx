import axios from "axios";
import "./register.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    console.log("Register form submitted", {
      email, password, firstName, lastName, address, phone,
    });
     axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
     }).then(()=>{
        toast.success("User registered successfully")
        navigate("/login")
     }).catch((err)=>{
        toast.error(err?.response?.data?.error||"Something went wrong")
     })
    }

  return (
    <div className="bg-picture w-full h-screen flex justify-center items-center text-[#bbb]">
      <div className="w-[500px] backdrop-blur-2xl bg-black/70 p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-white">Register</h2>
        </div>
        <form onSubmit={handleRegister} className="space-y-2">
          <div>
            <label className="block mb-1 text-sm">First Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Last Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Address</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="123 Street Name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Phone</label>
            <input
              type="tel"
              className="w-full p-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="+123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#53c28b] hover:bg-[#53c28b70] text-white font-medium py-3 rounded-md transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

