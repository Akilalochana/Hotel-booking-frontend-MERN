import ContactPage from "./contactPage";
import GalleryPage from "./galleryPage";
import RoomsPage from "./roomsPage";
import "./home.css";
import Search from "../../components/search";
import RoomHome from "./roomHome";
import { ReviewHomePage } from "./review";
import { Footer } from "@/components/footer";
import ChatbotIcon from "@/components/chatBot";
import { BlurFade } from "@/components/magicui/blur-fade";



export default function Home() {
  return (
    <>
    {/* <div className="bg-picture w-full h-screen flex justify-center items-center">
      <div className="w-[600px] h-[200px] absolute flex flex-col justify-center items-center mr-[750px] mb-[200px]">
        <h1 className="text-6xl font-extrabold text-white">Experience Luxury Like Never Before</h1>
        <span>Indulge in exceptional comfort and unparalleled service at our premium hotel destinations.</span>
      </div>
     
      <Search/>
      
    </div> */}

      <div className="bg-picture w-full h-screen flex justify-center items-center">
        <div className="w-[300px] md:w-[600px] h-[200px] absolute flex flex-col justify-center items-center mr-[50px] mb-[270px] md:mr-[750px] md:mb-[250px]">

          <h1 className="text-5xl md:text-6xl font-extrabold text-white">Experience Luxury Like Never Before</h1>

          {/* <div className="w-auto h-[150px] mt-[80px]">
            <section id="header">
                <BlurFade delay={0.25} inView>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Experience Luxury Like Never Before
                  </h1>
                </BlurFade>
            </section>        
          </div> */}

          <span>Indulge in exceptional comfort and unparalleled service at our premium hotel destinations.</span>
        </div>  
        <Search/>
        <div className="w-[100px] h-[100px] fixed ml-[1300px] mt-[500px]">
          <ChatbotIcon/>
        </div>
        {/* <div className="w-[100px] h-[100px] fixed ml-[1300px] mt-[10px] ">
          <ScratchToRevealDemo/>
        </div> */}
    </div>
    <RoomHome/>
    <ReviewHomePage/>
    <ContactPage/>
    <Footer/>
    
    </>
  )
}



     