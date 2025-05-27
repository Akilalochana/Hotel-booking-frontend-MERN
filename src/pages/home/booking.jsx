import BookingCard from "@/components/bookingCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookingPage() {
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/bookings`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data.bookings && Array.isArray(res.data.bookings)) {
                if (res.data.bookings.length === 0) {
                    setLoadingStatus("empty");
                } else {
                    setRooms(res.data.bookings);
                    setLoadingStatus("success");
                }
            } else {
                setLoadingStatus("empty");
            }
        }).catch((err) => {
            console.log(err);
            setLoadingStatus("error");
        });
    }, []);

    return (
        <div className="w-full h-screen flex items-center flex-col">
            <h1 className="md:text-7xl text-5xl mt-[90px] mb-[20px] font-extrabold">Your bookings</h1>
            <div className="w-full h-auto flex flex-col items-center">
                {loadingStatus === "loading" && <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mt-12"></div>}

                {loadingStatus === "success" && rooms.length > 0 && rooms.map((room) => (
                    <div key={room._id}>
                        <BookingCard room={room} />
                    </div>
                ))}

                {loadingStatus === "empty" && <div className="w-[500px] h-[300px] flex flex-col justify-center items-center gap-8">
                    <h1 className="text-3xl font-bold text-white mt-12">You haven't booked yet.</h1>
                    <Link
                        to="/rooms"
                        className="px-6 py-2 bg-transparent text-[#4bbb83] border border-[#4bbb83] rounded-[4px] hover:bg-[#4bbb83] hover:text-white transition duration-300 flex items-center gap-2"
                        >
                        Book Now
                        <span className="text-lg">→</span>
                    </Link>
                    </div>}

                {loadingStatus === "error" && (
                    <div className="w-[500px] h-[500px] flex flex-col justify-center items-center px-4">
                        <h1 className="text-[80px] font-extrabold text-[#53c28b] mb-4">Oops!</h1>
                        <p className="text-2xl text-gray-300 mb-6 text-center">
                            Please login and try again.
                        </p>
                        {/* <Link
                            to="/login"
                            className="px-6 py-3 bg-[#53c28b] text-white text-lg rounded-lg shadow-md hover:bg-[#53c28b90] transition duration-300"
                        >
                            login
                        </Link> */}
                         <Link
                            to="/login"
                            className="px-6 py-2 bg-transparent text-[#4bbb83] border border-[#4bbb83] rounded-[4px] hover:bg-[#4bbb83] hover:text-white transition duration-300 flex items-center gap-2"
                            >
                            login
                            <span className="text-lg">→</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}