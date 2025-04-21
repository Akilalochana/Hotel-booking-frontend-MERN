import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ContactPage from "./contactPage";
import GalleryPage from "./galleryPage";
import RoomsPage from "./roomsPage";
import ErrorPage from "./errorPage";
import Home from "./home";

export default function HomePage() {
  return (
    <>
      <Header/>
    

    <div className="w-full h-[calc(100vh-80px)] ">
      <Routes path="/*">
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/gallery" element={<GalleryPage/>}/>
        <Route path="/rooms" element={<RoomsPage/>}/>
        <Route path="/" element={<Home/>}/>

        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>


    </div>
    </>
  )
}