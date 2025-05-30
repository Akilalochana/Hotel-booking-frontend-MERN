import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeOrder, setActiveOrder] = useState(null);
	const [modalOpened, setModalOpened] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_HOST_URL}/api/bookings`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				
				// Handle different response formats
				let ordersData = [];
				if (Array.isArray(res.data)) {
					// Admin response - direct array
					ordersData = res.data;
				} else if (res.data.bookings && Array.isArray(res.data.bookings)) {
					// User response - object with bookings property
					ordersData = res.data.bookings;
				} else {
					// Fallback for unexpected formats
					ordersData = [];
				}
				
				setOrders(ordersData);
			} catch (error) {
				console.error("Error fetching orders:", error);
				setOrders([]); // Ensure orders is always an array
			} finally {
				setLoading(false);
			}
		};
		if (loading) {
			fetchOrders();
		}
	}, [loading]);

	function handleOrderStatusChange(bookingId, isApproved) {
		const token = localStorage.getItem("token");
		axios
			.put(
				`${import.meta.env.VITE_BACKEND_HOST_URL}/api/bookings/status/${bookingId}`,
				{ status: isApproved ? "approved" : "rejected" }, // Fixed: backend expects 'status', not 'isApproved'
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				setModalOpened(false);
				setLoading(true);
			})
			.catch((err) => {
				console.error(err);
				setLoading(true);
			});
	}

	return (
				<div className="p-8 text-white bg-[#1e1e1e] min-h-screen">
			<h1 className="text-3xl font-bold mb-6 text-center">All Bookings</h1>
			{loading ? (
				<p className="text-center text-gray-400">Loading...</p>
			) : orders.length === 0 ? (
				<p className="text-center text-gray-400">No bookings found.</p>
			) : (
				<div className="overflow-x-auto rounded-lg shadow-lg">
					<table className="min-w-full text-sm bg-[#2a2a2a]">
						<thead className="bg-[#333] text-gray-200 uppercase">
							<tr>
								<th className="px-4 py-3 text-left">Booking ID</th>
								<th className="px-4 py-3 text-left">Email</th>
								<th className="px-4 py-3 text-left">Days</th>
								<th className="px-4 py-3 text-left">Start Date</th>
								<th className="px-4 py-3 text-left">End Date</th>
								<th className="px-4 py-3 text-left">Amount</th>
								<th className="px-4 py-3 text-left">Status</th>
								<th className="px-4 py-3 text-left">Booked On</th>
							</tr>
						</thead>
						<tbody className="text-gray-300 divide-y divide-gray-700">
							{orders.map((order) => (
								<tr
									key={order._id}
									className="hover:bg-[#3a3a3a] transition cursor-pointer"
									onClick={() => {
										setActiveOrder(order);
										setModalOpened(true);
									}}
								>
									<td className="px-4 py-3">{order.bookingId}</td>
									<td className="px-4 py-3">{order.email}</td>
									<td className="px-4 py-3">{order.days}</td>
									<td className="px-4 py-3">{new Date(order.startingDate).toLocaleDateString()}</td>
									<td className="px-4 py-3">{new Date(order.endingDate).toLocaleDateString()}</td>
									<td className="px-4 py-3">Rs. {order.price.toFixed(2)}</td>
									<td className="px-4 py-3">
										<span className={`font-semibold px-2 py-1 rounded-md ${order.status === "approved" ? "text-green-400" : order.status === "rejected" ? "text-red-400" : "text-yellow-400"}`}>
											{order.status === "approved" ? "Approved" : order.status === "rejected" ? "Rejected" : "Pending"}
										</span>
									</td>
									<td className="px-4 py-3">{new Date(order.bookingDate).toLocaleDateString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}


			{modalOpened && activeOrder && (
				<div className="fixed top-0 left-0 w-full h-full bg-[#00000095] flex justify-center items-center">
					<div className="w-[500px] bg-[#111] border border-gray-600 p-4 rounded-lg shadow-lg relative">
						<IoMdCloseCircleOutline
							className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600"
							onClick={() => setModalOpened(false)}
						/>
						<h1 className="text-2xl font-semibold mb-4">Booking Details</h1>
						<div className="flex flex-col gap-2">
							<p><span className="font-semibold">Booking ID:</span> {activeOrder.bookingId}</p>
							<p><span className="font-semibold">Email:</span> {activeOrder.email}</p>
							<p><span className="font-semibold">Days:</span> {activeOrder.days}</p>
							<p><span className="font-semibold">Starting Date:</span> {new Date(activeOrder.startingDate).toLocaleDateString()}</p>
							<p><span className="font-semibold">Ending Date:</span> {new Date(activeOrder.endingDate).toLocaleDateString()}</p>
							<p><span className="font-semibold">Total Amount:</span> {activeOrder.price.toFixed(2)}</p>
							<p><span className="font-semibold">Approval Status:</span> {
								activeOrder.status === "approved" ? "Approved" : 
								activeOrder.status === "rejected" ? "Rejected" : "Pending"
							}</p>
							<p><span className="font-semibold">Booking Date:</span> {new Date(activeOrder.bookingDate).toLocaleDateString()}</p>
						</div>

						<div className="my-5 w-full flex justify-center items-center">
							<button
								onClick={() => handleOrderStatusChange(activeOrder.bookingId, true)}
								className="bg-green-500 text-white px-4 py-1 rounded-md"
							>
								Approve
							</button>
							<button
								onClick={() => handleOrderStatusChange(activeOrder.bookingId, false)}
								className="bg-red-500 text-white px-4 py-1 rounded-md ml-4"
							>
								Reject
							</button>
						</div>

						<table className="w-full mt-4">
							<thead>
								<tr>
									<th></th>
									<th>Product</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody className="bg-black">
								{activeOrder.bookingItems && activeOrder.bookingItems.map((item) => (
									<tr key={item.product.key}>
										<td>
											<img
												src={item.product.image}
												alt={item.product.name}
												className="w-10 h-10"
											/>
										</td>
										<td>{item.product.name}</td>
										<td>{item.product.price}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}