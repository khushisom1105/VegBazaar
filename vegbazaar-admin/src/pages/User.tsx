import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/Input";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4007/cms/users");
        setUsers(response.data.data); // Assuming API returns `data` object containing users
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  return (
    <div className="flex ">
    {/* Sidebar */}
    <Sidebar />
<div className="p-6 w-full">
      <div className="mb-4">
        <Input
          placeholder="Search Users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {loading ? (
          <p className="p-4 text-center text-gray-600">Loading users...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
               {/* // <th className="p-3">User ID</th> */}
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-t">
                    {/* <td className="p-3">{user._id}</td> */}
                    <td className="p-3">{user.firstName}</td>
                    <td className="p-3">{user.lastName}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
};

export default UserTable;
