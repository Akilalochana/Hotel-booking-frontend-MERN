import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const token = localStorage.getItem("token")
  
  return (
    <header className="w-full h-[70px] shadow-xl flex justify-center items-center fixed bg-black/80 top-0 left-0 z-50 text-white">
      <img src="/logo.png" alt="logo" className="w-[50px] h-[50px] object-cover border-[3px] absolute left-10 rounded-full" />
      <div className="hidden w-[450px] md:flex justify-evenly items-center">
        <Link to="/" className="hidden md:block text-[15px] m-1">
          Home
        </Link>
        <Link to="/contact" className="hidden md:block text-[15px] m-1">
          contact
        </Link>
        <Link to="/gallery" className="hidden md:block text-[15px] m-1">
          gallery
        </Link>
        {/* items */}
        <Link to="/rooms" className="hidden md:block text-[15px] m-1">
          Rooms
        </Link>
        <Link to="/booking" className="hidden md:block text-[15px] font-bold m-1 absolute right-24">
          <FaCartShopping />
        </Link>
      </div>
      <GiHamburgerMenu
        className="absolute right-5 text-[24px] md:hidden"
        onClick={() => {
          setNavPanelOpen(true);
        }}
      />
      {token!=null&&<button className="hidden md:block absolute right-5 text-[15px]" onClick={()=>{ 
        localStorage.removeItem("token")
        window.location.href = "/login"
      }}>
        logout
      </button>}
      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
    </header>
  );
}