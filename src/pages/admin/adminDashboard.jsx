import { FaHotel } from "react-icons/fa6";
import { BsGraphUp } from "react-icons/bs";
import { FaBookBookmark } from "react-icons/fa6";
import { MdBedroomChild } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import { AdminRooms } from "./adminRomms";
import AdminAddRooms from "./adminAddRooms";
import UpdateRooms from "./updateRooms";

export default function AdminDashboard() {
  return(
    <div className='w-full h-screen flex'>

    <div className='w-[400px] h-full border-[#bbb] border-r-2 '>
      <div className="flex h-[50px] font-bold text-2xl justify-center items-center mb-10">
         Admin Page
      </div>
      
      
      <button className='w-full h-[50px] text-2xl font-bold  flex justify-center items-center gap-1'>
        <BsGraphUp className='text-xl'/>
        Dashboard
      </button>

      <Link to="/admin/booking" className='w-full h-[50px] text-2xl font-bold   flex justify-center items-center gap-1'>
        <FaBookBookmark/>
        Bookings
      </Link>

      <Link to='/admin/rooms' className='w-full h-[50px] text-2xl font-bold   flex justify-center items-center gap-1'>
        <MdBedroomChild/>
        Rooms
      </Link>

      <Link to='/admin/reviews' className='w-full h-[50px] text-2xl font-bold   flex justify-center items-center gap-1'>
        <MdRateReview/>
        Reviews
      </Link>

      <Link to='/admin/users' className='w-full h-[50px] text-2xl font-bold   flex justify-center items-center gap-1'>
        <FaUserCog/>
        Users
      </Link>

    </div>

    <div className='w-[calc(100vw-400px)] h-full '>
      <Routes path="/*">
          <Route path="/booking" element={<h1>Booking</h1>}/>
          <Route path="/rooms" element={<AdminRooms/>}/>
          <Route path="/reviews" element={<h1>Reviews</h1>}/>
          <Route path="/users" element={<h1>Users</h1>}/>
          <Route path="/rooms/add" element={<AdminAddRooms/>}/>
          <Route path="/rooms/edit" element={<UpdateRooms/>}/>

      </Routes>
      
    </div>
  </div>
  )
}