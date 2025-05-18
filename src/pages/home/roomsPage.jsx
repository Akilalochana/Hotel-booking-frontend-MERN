import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../../components/productCard"
import { BlurFade } from "@/components/magicui/blur-fade"

export default function RoomsPage() {
  const [state, setState]= useState("loading")//loding,success,error
  const [rooms, setRooms]= useState([])
  useEffect(()=>{
    if(state ==="loading"){
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`).then((res)=>{
        console.log(res.data)
        setRooms(res.data)
        setState("success")
      }
  
      ).catch((err)=>{
        toast.error(err?.response?.data?.error || "Something went wrong")
        setState("error")
      })
    }
    
  },[])


  return (
    <div className="w-full h-full flex flex-col items-center">
       <div className="w-auto h-[150px] mt-[80px]">
        <section id="header">
            <BlurFade delay={0.45} inView>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                 our rooms
              </h1>
            </BlurFade>
        </section>        
       </div>
      
    <div className="w-full h-full flex flex-wrap justify-center  pt-[30px] gap-[50px]">
      
      {state === "loading" && <div className="w-full h-full flex justify-center items-center ">
        <div className="w-[50px] h-[50px] border-4 rounded-full border-t-[#4ce498] animate-spin"></div></div>}

      {state === "success" && 
      
      rooms.map((room)=>{
        return(
          <div key={room._id}>
            <ProductCard room={room}/>
          </div>
          
        )
      })}  
    </div>

    </div>
  )
}

