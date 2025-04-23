const sampleArr = [
  {
    key: "RM101",
    name: "Deluxe Suite",
    price: 12000,
    category: "AC",
    description: "Spacious AC room with sea view, attached bathroom, and balcony.",
    bedRomms: 2,
    availability: true,
    image: [
      "https://www.w3schools.com/howto/img_paris.jpg",
      "https://www.w3schools.com/w3images/bedroom.jpg"
    ]
  },
  {
    key: "RM102",
    name: "Standard Room",
    price: 8500,
    category: "NON AC",
    description: "Cozy non-AC room with basic amenities and garden view.",
    bedRomms: 1,
    availability: true,
    image: [
      "https://www.w3schools.com/w3images/room_single.jpg"
    ]
  },
  {
    key: "RM103",
    name: "Family Room",
    price: 15000,
    category: "AC",
    description: "Large AC family room with two queen beds and a mini kitchen.",
    bedRomms: 3,
    availability: false,
    image: [
      "https://www.w3schools.com/w3images/familyroom.jpg"
    ]
  },
  {
    key: "RM104",
    name: "Budget Room",
    price: 6000,
    category: "NON AC",
    description: "Affordable room for backpackers, non-AC, clean and comfortable.",
    bedRomms: 1,
    availability: true,
    image: [
      "https://www.w3schools.com/howto/img_nature_wide.jpg"
    ]
  }
];


import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export function AdminRooms(){
  const [rooms, setRooms] = useState(sampleArr);
  return(
    <div className="w-full h-full relative" >
      <table>
        <thead>
          <th>key</th>
          <th>name</th>
          <th>price</th>
          <th>category</th>
          <th>bedRomms</th>
          <th>availability</th>
        </thead>
        <tbody>
          
            {
              rooms.map((room, index)=>{
                console.log(room)
                return (
                        <tr key={index}>
                          <td>{room.key}</td>
                          <td>{room.name}</td>
                          <td>{room.price}</td>
                          <td>{room.category}</td>
                          <td>{room.bedRomms}</td>
                          <td>{room.availability}</td>
                        </tr>  
                )
              })
            }
          
        </tbody>

      </table>

      <Link to="/admin/rooms/add">
      <FaPlusCircle className="text-[60px] absolute right-10 bottom-10 hover:text-[#53c28b] hover:animate-pulse " /> 
      </Link>
    </div>
  )
}