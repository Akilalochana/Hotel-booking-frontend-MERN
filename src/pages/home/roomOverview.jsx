import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../../utils/cart";
import toast from "react-hot-toast";
import RoomReviews from "@/components/roomReviews";


export default function RoomOverview() {
  const params = useParams();
  console.log(params)// can get key when pass with Url
  const key = params.key

  const [loadingStatus, setLoadingStatus] = useState("loading")//loding,loaded,error
  const [room, setRoom] = useState({});

  //pop up screen
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [bookingItems, setBookingItems] = useState([{ key }]);
  const [days, setDays] = useState(1);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  function confirmBooking(){
    axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/bookings`,{
      startingDate: startingDate,
      endingDate: endingDate,
      days: days,
      bookingItems: bookingItems
    },{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token") 
      }
    })
    toast.success("Booking created successfully")
    setShowBookingPopup(false)
  }

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/products/${key}`).then((res)=>{
      setRoom(res.data)
      setLoadingStatus("loaded")
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
      setLoadingStatus("error")
    })
  },[])
    
  return (
    <div className="w-full min-h-screen text-[#bbb] flex flex-col items-center p-6">
      {loadingStatus === "loading" && (
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-[50px] h-[50px] border-4 border-t-[#53c28b] border-[#bbb] rounded-full animate-spin"></div>
        </div>
      )}

      {loadingStatus === "loaded" && (
        <div className="w-full max-w-[750px] mt-[60px] flex flex-col gap-8 bg-[#1a1a1a] p-4 rounded-xl shadow-lg mb-10">
          
          <div className="w-full md:flex md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <ImageSlider images={room.image} />
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-[#53c28b]">{room.name}</h1>
              <h2 className="text-xl">{room.category}</h2>
              <p className="text-md leading-relaxed">{room.description}</p>
              <p className="text-lg font-semibold">Price: Rs. {room.price}</p>
              <p className="text-lg">Bedrooms: {room.bedRomms}</p>
              
              <button className="mt-5 bg-[#53c28b] hover:bg-[#53c28b70] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              onClick={() => setShowBookingPopup(true)}
              > Create Booking </button>
            </div>
          </div>
          
          {/* Add the reviews component here */}
          <RoomReviews roomKey={key} />
          
          {showBookingPopup && (
            <div className="fixed inset-0 bg-black/85 bg-opacity-60 z-50 flex justify-center items-center">
              <div className="bg-[#1a1a1a] text-white p-6 rounded-xl w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">Create Booking</h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Days</label>
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => setDays(parseInt(e.target.value))}
                      className="w-full p-2 rounded bg-[#2c2c2c] border border-[#444]"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Starting Date</label>
                    <input
                      type="date"
                      value={startingDate}
                      onChange={(e) => setStartingDate(e.target.value)}
                      className="w-full p-2 rounded bg-[#2c2c2c] border border-[#444]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Ending Date</label>
                    <input
                      type="date"
                      value={endingDate}
                      onChange={(e) => setEndingDate(e.target.value)}
                      className="w-full p-2 rounded bg-[#2c2c2c] border border-[#444]"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => {
                      const payload = {
                        bookingItems,
                        days,
                        startingDate,
                        endingDate
                      };
                      console.log("Booking Payload:", payload);
                      confirmBooking();
                    }}
                    className="bg-[#53c28b] hover:bg-[#53c28b90] text-white px-4 py-2 rounded"
                  >
                    Confirm Booking
                  </button>

                  <button
                    onClick={() => setShowBookingPopup(false)}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {loadingStatus === "error" && (
        <div className="flex flex-col items-center justify-center h-full p-6">
          <h1 className="text-4xl font-bold text-[#53c28b] mb-4">Oops!</h1>
          <p className="text-xl text-center mb-6">We couldn't find that room. Please try again.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-[#53c28b] hover:bg-[#53c28b70] text-white font-bold py-2 px-6 rounded-lg"
          >
            Go Back
          </button>
        </div>
      )}
      
    </div>
  );
}