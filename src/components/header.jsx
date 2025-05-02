import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='w-full h-[80px] border-[#bbb] border-b-1 items-center flex justify-between'>

      <div className=" ml-[100px]">
        <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-cover" />
      </div>

      <div className="flex justify-center items-center gap-10  mr-15">
        <Link to="/" className='text-xl font-bold'>Home</Link>

        <Link to="/contact" className='text-xl font-bold'>Contact</Link>

        <Link to="/gallery" className='text-xl font-bold'>Gallery</Link>
        
        <Link to="/rooms" className='text-xl font-bold'>Rooms</Link>
      </div>
      <Link to="/booking" className="text-[25px] font-bold mr-6" >
        <FaCartShopping/>
      </Link>
        
    </header>
  )
}