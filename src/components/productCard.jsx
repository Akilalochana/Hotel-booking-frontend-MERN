import { Link } from "react-router-dom"

export default function ProductCard({ room }) {
  // Extract or define amenities from room data
  const amenities = [
    { icon: "📶", label: "Free WiFi", available: true },
    { icon: "🛁", label: "Sea Bath", available: true },
    { icon: "📺", label: '55" TV', available: true },
    { icon: "☕", label: "Mini Bar", available: true },
  ]

  return (
    <div className="max-w-sm bg-[#222] dark:bg-gray-900 rounded-[8px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image with Popular tag */}
      <div className="relative">
        <img className="w-full h-48 object-cover" src={room.image[0] || "/placeholder.svg"} alt={room.name} />
        {room.popular && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Popular</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-xl font-semibold  dark:text-white">{room.name}</h2>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
            <span className="text-sm font-medium">{room.rating || "4.9"}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{room.description}</p>

        {/* Amenities */}
        <div className="flex space-x-3 mb-3">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center text-xs text-gray-500">
              <span className="mr-1">{amenity.icon}</span>
              <span>{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold">
            Rs. {room.price}
            <span className="text-xs font-normal text-gray-500">/night</span>
          </div>

          <Link
            to={"/product/" + room.key}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

