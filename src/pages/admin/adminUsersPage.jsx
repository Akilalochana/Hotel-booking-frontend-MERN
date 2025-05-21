import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST_URL}/api/users/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
        if(loading){
            fetchUsers();
        }
  }, [loading]);

    function handleBlockUser(email){
    
        const token = localStorage.getItem("token");

        axios.put(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/users/block/${email}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(()=>{
            setLoading(true);
        }).catch((err)=>{
            console.error(err);
        })
    }

  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">All Users</h1>
      <table className="min-w-full bg-111 border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="py-3 px-4 border-b text-left">#</th>
            <th className="py-3 px-4 border-b text-left">Profile</th>
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Email</th>
            <th className="py-3 px-4 border-b text-left">Phone</th>
            <th className="py-3 px-4 border-b text-left">Address</th>
            <th className="py-3 px-4 border-b text-left">Role</th>
            <th className="py-3 px-4 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{index + 1}</td>
              <td className="py-3 px-4 border-b">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="py-3 px-4 border-b">
                {user.firstName} {user.lastName}
              </td>
              <td className="py-3 px-4 border-b">{user.email}</td>
              <td className="py-3 px-4 border-b">{user.phone}</td>
              <td className="py-3 px-4 border-b">{user.address}</td>
              <td className="py-3 px-4 border-b capitalize text-green-600 font-medium">{user.role}</td>
              <td onClick={()=>{handleBlockUser(user.email)}} className="py-3 px-4 border-b capitalize text-green-600 font-medium cursor-pointer hover:text-blue-600">{user.isBlocked? "Blocked" : "Active"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
