import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10); // Items per page
    const [dataUpdated, setDataUpdated] = useState(false);

    const token = localStorage.getItem("token");
    
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to the first page on search
    };

    const handleDeleteById = async (id) => { 
        try {
            const response = await axios.delete(`https://myproject-tau-brown.vercel.app/api/user/${id}`, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success("Deleted successfully");
                setDataUpdated(prev => !prev); // Toggle the state to trigger useEffect
            } else {
                toast.error("Failed to delete")
            }
        } catch (error) {
            toast.error('Error deleting:', error);
        }
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('https://myproject-tau-brown.vercel.app/api/users', {
                    params: {
                        page,
                        limit,
                        search
                    }
                });
                setUsers(res.data.users);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, [page, search, limit, dataUpdated]);

    return (
        <>
            <div className="mx-4">
                <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>

                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search by Customer Name or Order ID"
                        className="input input-bordered"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="overflow-x-auto  shadow  mt-4 rounded-md bg-white">
                    <table className="table w-full table-sm">
                        <thead>
                            <tr className="font-semibold text-base">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.profileName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phonenumber}</td>
                                    <td>{user.location}</td>
                                    <td className="flex gap-2 items-center">
                                        <Link to={``} className="text-green-700 bg-green-200 p-1 rounded-md text-lg"><GrView /></Link>
                                        <button onClick={() => handleDeleteById(user._id)} className="text-red-700 bg-red-200 p-1 rounded-md text-lg"><FaRegTrashAlt /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        className="btn btn-primary"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                        className="btn btn-primary"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>

            </div>
        </>
    );
};

export default Users;