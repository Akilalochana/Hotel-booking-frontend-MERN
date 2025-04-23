import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminAddRooms() {
  const [roomKey, setRoomKey] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomPrice, setRoomPrice] = useState("0");
  const [roomType, setRoomType] = useState("NON AC");
  const [roomDescription, setRoomDescription] = useState("");
  const [bedRooms, setBedRooms] = useState("0");

  const navigate = useNavigate();

  async function handleSubmit(e) {

    console.log(roomKey, roomName, roomPrice, roomType, roomDescription, bedRooms);

    const token = localStorage.getItem("token")

    if(token){
      try{
        const results = await axios.post("http://localhost:3000/api/products",{
          key: roomKey,
          name: roomName,
          price: roomPrice,
          category: roomType,
          description: roomDescription,
          bedRomms: bedRooms
  
        },{
          headers:{
            Authorization : "Bearer "+ token
          }
        })
        
        toast.success(results.data.message)
        navigate("/admin/rooms")

      }catch(err){
        
        toast.error(err.response.data.error)
      }

      
    }else{
      toast.error("You are not logged in")
    }
    
  } 

  return (
    <div className="min-h-screen bg-[#111] text-[#bbb] flex items-center justify-center">
      <div className="bg-[#1c1c1c] p-8 rounded-2xl shadow-lg w-[500px]">
      
          <div>
            <label className="block mb-1 text-sm">Room Key</label>
            <input
              type="text"
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="Enter room key"
              value={roomKey}
              onChange={(e) => setRoomKey(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Room Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Room Price</label>
            <input
              type="Number"
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="Enter room price"
              value={roomPrice}
              onChange={(e) => setRoomPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Room Type</label>
            <select
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            >
              <option value="NON AC">NON AC</option>
              <option value="AC">AC</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Room Description</label>
            <textarea
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b] resize-none h-24"
              placeholder="Enter room description"
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Bed rooms</label>
            <input
              type="number"
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#53c28b]"
              placeholder="Enter room quantity"
              value={bedRooms}
              onChange={(e) => setBedRooms(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#53c28b] hover:bg-[#53c28b70] text-white font-medium py-3 rounded-md transition"
            
          >
            Add Room
          </button>
        
          <button onClick={()=>{
            navigate("/admin/rooms")
          }}
            className="w-full bg-[#53c28b] hover:bg-[#53c28b70] text-white font-medium py-3 rounded-md transition mt-5">
              cancel
            </button>
      </div>
    </div>  
  );
}