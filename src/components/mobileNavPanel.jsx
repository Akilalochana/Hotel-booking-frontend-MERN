import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts, MdInfoOutline } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel(props) {
	const isOpen = props.isOpen;
	const setOpen = props.setOpen;
	const navigate = useNavigate();

	function goTo(route) {
		navigate(route);
		setOpen(false);
	}

	return (
		<>
			{isOpen && (
				<div className="w-full h-screen bg-black/80 backdrop-blur-sm fixed top-0 left-0 z-50">
					<div className="h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black w-[320px] shadow-2xl border-r border-gray-700">
						{/* Header */}
						<div className="bg-gradient-to-r from-gray-800 to-gray-900 w-full h-[80px] flex relative justify-center items-center border-b border-gray-700">
							{/* <img
								src="/logo.png"
								alt="logo"
								className="w-[65px] h-[65px] object-cover border-[3px] border-green-500/50 absolute left-3 rounded-full shadow-lg"
							/> */}
							<div className="text-white font-bold text-lg">Hotel Win Win</div>
							<IoMdClose
								className="absolute right-4 text-3xl cursor-pointer text-gray-400 hover:text-white transition-colors"
								onClick={() => {
									setOpen(false);
								}}
							/>
						</div>

						{/* Navigation Links */}
						<div className="pt-6 px-2">
							<div
								onClick={() => {
									goTo("/");
								}}
								className="text-[18px] text-gray-300 mx-2 my-3 p-4 flex items-center gap-4 cursor-pointer hover:bg-green-500/10 rounded-xl transition-all duration-300 hover:text-white border border-transparent hover:border-green-500/30"
							>
								<CiHome className="text-2xl" />
								<span className="font-medium">Home</span>
							</div>

							<div
								onClick={() => {
									goTo("/rooms");
								}}
								className="text-[18px] text-gray-300 mx-2 my-3 p-4 flex items-center gap-4 cursor-pointer hover:bg-green-500/10 rounded-xl transition-all duration-300 hover:text-white border border-transparent hover:border-green-500/30"
							>
								<CiSpeaker className="text-2xl" />
								<span className="font-medium">Rooms</span>
							</div>

							<div
								onClick={() => {
									goTo("/gallery");
								}}
								className="text-[18px] text-gray-300 mx-2 my-3 p-4 flex items-center gap-4 cursor-pointer hover:bg-green-500/10 rounded-xl transition-all duration-300 hover:text-white border border-transparent hover:border-green-500/30"
							>
								<MdPhotoLibrary className="text-2xl" />
								<span className="font-medium">Gallery</span>
							</div>

							<div
								onClick={() => {
									goTo("/booking");
								}}
								className="text-[18px] text-gray-300 mx-2 my-3 p-4 flex items-center gap-4 cursor-pointer hover:bg-green-500/10 rounded-xl transition-all duration-300 hover:text-white border border-transparent hover:border-green-500/30"
							>
								<FaRegCalendarCheck className="text-2xl" />
								<span className="font-medium">Booking</span>
							</div>

							<div
								onClick={() => {
									goTo("/contact");
								}}
								className="text-[18px] text-gray-300 mx-2 my-3 p-4 flex items-center gap-4 cursor-pointer hover:bg-green-500/10 rounded-xl transition-all duration-300 hover:text-white border border-transparent hover:border-green-500/30"
							>
								<MdContacts className="text-2xl" />
								<span className="font-medium">Contact</span>
							</div>

							<div
								onClick={() => {
									goTo("/reviews");
								}}
								className="text-[18px] text-gray-300 mx-2 my-3 p-4 flex items-center gap-4 cursor-pointer hover:bg-green-500/10 rounded-xl transition-all duration-300 hover:text-white border border-transparent hover:border-green-500/30"
							>
								<MdInfoOutline className="text-2xl" />
								<span className="font-medium">Reviews</span>
							</div>
						</div>

						{/* Footer section */}
						<div className="absolute bottom-6 left-0 right-0 px-4">
							<div className="text-center text-gray-400 text-sm">
								<div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent mb-4"></div>
								Experience Luxury Like Never Before
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}