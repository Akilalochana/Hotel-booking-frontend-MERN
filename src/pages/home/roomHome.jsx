import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function RoomHome() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch rooms data
    axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/products`)
      .then((res) => {
        setRooms(res.data);
        setFilteredRooms(res.data);
        console.log(res.data);

        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to load rooms");
        setLoading(false);
      });
  }, []);

  // Filter rooms based on selected category
  const handleFilter = (filter) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setFilteredRooms(rooms);
    } else if (filter === "couple") {
      const coupleRooms = rooms.filter(room => room.bedRomms <= 2);
      setFilteredRooms(coupleRooms);
    } else if (filter === "family") {
      const familyRooms = rooms.filter(room => room.bedRomms > 2);
      setFilteredRooms(familyRooms);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-12">


      <div className="w-full max-w-2xl px-4 py-8 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-extrabold mb-3">Exclusive Rooms & Suites</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus numquam, ullam iusto nobis, error dolorum! Sequi necessitatibus debitis eaque rem iste culpa.
        </p>
      </div>


      <div className="w-full max-w-lg mb-8 px-4 flex justify-center items-center gap-4">
        <button 
          className={`${
            activeFilter === "all" ? "bg-[#4bbb83]" : "bg-[#53c28b]"
          } hover:bg-[#53c28b70] text-white py-1 px-6 text-[12px] md:text-[15px]  rounded-[4px] transition-colors duration-300`}
          onClick={() => handleFilter("all")}
        >
          All Rooms
        </button>

        <button 
          className={`${
            activeFilter === "couple" ? "bg-[#4bbb83]" : "bg-[#53c28b]"
          } hover:bg-[#53c28b70] text-white py-1 px-6 text-[12px] md:text-[15px] rounded-[4px] transition-colors duration-300`}
          onClick={() => handleFilter("couple")}
        >
          Couple Rooms
        </button>

        <button 
          className={`${
            activeFilter === "family" ? "bg-[#4bbb83]" : "bg-[#53c28b]"
          } hover:bg-[#53c28b70] text-white py-1 px-6 text-[12px] md:text-[15px] rounded-[4px] transition-colors duration-300`}
          onClick={() => handleFilter("family")}
        >
          Family Rooms
        </button>
      </div>

 
      <div className="w-full max-w-6xl px-4">
        {loading ? (
          <div className="flex gap-10">
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
          </div>
        ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.length > 0 ? (
                  filteredRooms.slice(0, 3).map((room) => (
                    <div key={room._id}>
                      <ProductCard room={room} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500 text-lg">No rooms found in this category.</p>
                  </div>
                )}
            </div>
        )}
      </div>

      <div className="w-full flex justify-center mt-8">
        <Link
          to="/rooms"
          className="px-6 py-2 bg-transparent text-[#4bbb83] border border-[#4bbb83] rounded-[4px] hover:bg-[#4bbb83] hover:text-white transition duration-300 flex items-center gap-2"
        >
          View All Rooms
          <span className="text-lg">→</span>
        </Link>
      </div>

    </div>
  );
}