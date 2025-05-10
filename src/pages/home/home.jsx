import ContactPage from "./contactPage";
import GalleryPage from "./galleryPage";
import RoomsPage from "./roomsPage";
import "./home.css";
import Search from "../../components/search";
import RoomHome from "./roomHome";

export default function Home() {
  return (
    <>
    <div className="bg-picture w-full h-screen flex justify-center items-center">
      <div className="w-[600px] h-[200px] absolute flex flex-col justify-center items-center mr-[750px] mb-[200px]">
        <h1 className="text-6xl font-extrabold text-white">Experience Luxury Like Never Before</h1>
        <span>Indulge in exceptional comfort and unparalleled service at our premium hotel destinations.</span>
      </div>
     
      <Search/>
      
    </div>
    <RoomHome/>
    <GalleryPage/>
    <ContactPage/>
    
    
    </>
  )
}



     