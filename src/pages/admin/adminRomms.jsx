import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();


  

  useEffect(() => {
  
    if(!itemsLoaded){
      const token = localStorage.getItem("token");
      
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        headers: {"Authorization": `Bearer ${token}`} 
      })
      .then((res) => {
        console.log(res.data);
        setRooms(res.data);
        setItemsLoaded(true)
      })
      .catch((err) => {
        console.log(err);
      });
    }
   
  }, [itemsLoaded]);

 
  const handleDelete = (key) => {
    if(window.confirm("Are you sure you want to delete this room?")){
      setRooms(rooms.filter((room) => room.key !== key));
      const token = localStorage.getItem("token");

      axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`, {
        headers: {"Authorization": `Bearer ${token}`}
      }).then(
        (res) => {        
          console.log(res.data)
          setItemsLoaded(false);
      }).catch(
        (err) => {        
           console.log(err)
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#111] text-white p-6">
      {!itemsLoaded && <div className="border-4 border-b-[#35de8a] rounded-full animate-spin my-4 w-[100px] h-[100px] bg-0 absolute ml-[450px] mt-[300px]"></div>}
      
      <div className="max-w-6xl mx-auto bg-[#1c1c1c] p-6 rounded-2xl shadow-lg ">

        <h2 className="text-2xl font-semibold mb-4 text-[#53c28b]">All Rooms</h2>
        {itemsLoaded && <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-[#2a2a2a] text-[#bbb] uppercase">
                <th className="p-3 text-left">Key</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Bedrooms</th>
                <th className="p-3 text-left">Available</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr
                  key={index}
                  className="border-b border-[#333] hover:bg-[#2a2a2a] transition"
                >
                  <td className="p-3">{room.key}</td>
                  <td className="p-3">{room.name}</td>
                  <td className="p-3">Rs. {room.price}</td>
                  <td className="p-3">{room.category}</td>
                  <td className="p-3">{room.bedRomms}</td>
                  <td className="p-3">
                    {room.availability ? (
                      <span className="text-green-400 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-400 font-medium">No</span>
                    )}
                  </td>
                  <td className="p-3 text-center flex justify-center gap-4">
                    <button
                      onClick={()=>{
                        navigate("/admin/rooms/edit",{state:room})
                      }}
                      className="text-[#53c28b] hover:text-white transition"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(room.key)}
                      className="text-red-500 hover:text-white transition"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
        <Link to="/admin/rooms/add">
          <FaPlusCircle className="text-[60px] fixed right-10 bottom-10 text-[#53c28b] hover:animate-pulse transition" />
        </Link>
      </div>
    </div>
  );
}
