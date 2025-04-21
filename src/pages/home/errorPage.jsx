import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <h1 className="text-7xl font-extrabold text-[#53c28b] mb-4 animate-bounce">404</h1>
      <p className="text-2xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#53c28b] text-white text-lg rounded-lg shadow-md hover:bg-[#53c28b70] transition duration-300"
      >
        Back to Home Page
      </Link>
    </div>
  );
}
