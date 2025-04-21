import { FaHotel } from "react-icons/fa6";
import { BsGraphUp } from "react-icons/bs";
import { FaBookBookmark } from "react-icons/fa6";
import { MdBedroomChild } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";

export default function AdminDashboard() {
  return(
    <div className='w-full h-screen flex'>

    <div className='w-[400px] h-full border-[#bbb] border-r-2 mt-5'>
      <div className="flex h-[50px] font-bold text-2xl justify-center items-center mb-10">
        <FaHotel className='text-xl'/> Hotel WIN WIN
      </div>
      
      
      <button className='w-full h-[50px] text-2xl font-bold  flex justify-center items-center gap-1'>
        <BsGraphUp className='text-xl'/>
        Dashboard
      </button>

      <button className='w-full h-[50px] text-2xl font-bold   flex justify-center items-center gap-1'>
        <FaBookBookmark/>
        Bookings
      </button>

      <button className='w-full h-[50px] text-2xl font-bold   flex justify-center items-center gap-1'>
        <MdBedroomChild/>
        Rooms
      </button>

      <button className='w-full h-[50px] text-2xl font-bold   flex justify-center items-center gap-1'>
        <MdRateReview/>
        Reviews
      </button>

      <button className='w-full h-[50px] text-2xl font-bold   flex justify-center items-center gap-1'>
        <FaUserCog/>
        Users
      </button>

    </div>

    <div className='w-full h-full'>
      
    </div>
  </div>
  )
}