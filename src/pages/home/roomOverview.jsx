import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../../utils/cart";

export default function RoomOverview() {
  const params = useParams();
  console.log(params)// can get key when pass with Url
  const key = params.key

  const [loadingStatus, setLoadingStatus] = useState("loading")//loding,loaded,error

  const [room, setRoom] = useState({});

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`).then((res)=>{
      setRoom(res.data)
      setLoadingStatus("loaded")
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
      setLoadingStatus("error")
    })
  },[])
    


  return (
    <div className="w-full min-h-screen text-[#bbb] flex justify-center items-center p-6">
      {loadingStatus === "loading" && (
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-[50px] h-[50px] border-4 border-t-[#53c28b] border-[#bbb] rounded-full animate-spin"></div>
        </div>
      )}

      {loadingStatus === "loaded" && (
        <div className="w-[350px] flex flex-col md:flex-row gap-8 items-center   bg-[#1a1a1a] p-4 rounded-xl shadow-lg   mb-[50px] ">
          
          <div className="w-full md:w-1/2">
            <ImageSlider images={room.image} />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#53c28b]">{room.name}</h1>
            <h2 className="text-xl">{room.category}</h2>
            <p className="text-md leading-relaxed">{room.description}</p>
            <p className="text-lg font-semibold">Price: Rs. {room.price}</p>
            <p className="text-lg">Bedrooms: {room.bedRomms}</p>
            

            <button className="mt-5 bg-[#53c28b] hover:bg-[#53c28b70] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300" onClick={()=>{
              addToCart(room.key,1)
              console.log(loadCart())
            }}> Add to cart </button>
          </div>
          


        </div>
      )}
      
    </div>
  );
}