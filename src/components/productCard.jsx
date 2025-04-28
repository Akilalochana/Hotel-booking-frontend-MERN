import { Link } from "react-router-dom";

export default function ProductCard({ room }) {
  return (
    <div className="max-w-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img
        className="w-full h-48 object-cover"
        src={room.image[0]}
        alt={room.name}
      />
      <div className="flex-1 px-6 py-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Room {room.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><strong>Price:</strong> Rs. {room.price}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><strong>Category:</strong> {room.category}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><strong>Description:</strong> {room.description}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-1"><strong>Bedrooms:</strong> {room.bedRomms}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            <strong>Availability:</strong>{" "}
            <span className={room.availability ? "text-green-500" : "text-red-500"}>
              {room.availability ? "Available" : "Not Available"}
            </span>
          </p>
        </div>
        <Link
          to={"/product/"+room.key}
          className="mt-auto bg-[#53c28b] hover:bg-[#53c28b70] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
