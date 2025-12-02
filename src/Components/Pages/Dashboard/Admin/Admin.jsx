import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import AdminEditModal from "./AdminEditModal";
import Modal from "../../../AllComponents/Shared/Modal";


const Admin = () => {
    const { register, handleSubmit, reset } = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);

    const [dataUpdated, setDataUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [admins, setAdmins] = useState([]);
    const [editAdmin, setEditAdmin] = useState(null);

    const token = localStorage.getItem("token");

    const onSubmit = async (data) => {
        const email = data?.email;
        const password = data?.password;
        const postData = { email, password };

        console.log('postData' , postData)

        try {
            setIsLoading(true)
            const response = await axios.post('https://myproject-tau-brown.vercel.app/api/admin/create', postData, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success("Admin Create successfully");
                setIsLoading(false)
                reset();
                closeModal();
                setDataUpdated(prev => !prev); // Toggle the state to trigger useEffect
            } else {
                toast.error("Failed to create");
                setIsLoading(false)
            }
        } catch (error) {
            toast.error('Error:', error);
            setIsLoading(false)
        }
    }

    const handleUpdateById = (id) => {
        openModal2();
        const findAdmin = admins?.find(c => c?._id === id);
        setEditAdmin(findAdmin);
    }

    const handleDeleteById = async (id) => {
        try {
            const response = await axios.delete(`https://myproject-tau-brown.vercel.app/api/admin/${id}`, {
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
        const fetchAdmin = async () => {
            try {
                const res = await axios.get('https://myproject-tau-brown.vercel.app/api/admins');
                setAdmins(res?.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchAdmin();
    }, [dataUpdated])
    
    return (
        <>
            <Toaster />
            <div className="mx-4 md:mx-auto lg:w-3/4">
                <>
                    <button onClick={openModal} className="bg-mainColor text-white btn text-lg hover:bg-darkColor rounded-lg">
                        Create Admin
                    </button>

                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        {/* <h2 className="text-xl font-bold">Add Product</h2> */}
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-medium ">Email: *</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name="email" placeholder="Email here..." className="input input-bordered text-lg" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-medium ">Password: *</span>
                                </label>
                                <input {...register("password", { required: true })} type="text" name="password" placeholder="Password here..." className="input input-bordered text-lg" required />
                            </div>
                            <div className="mt-6 mx-auto">
                                <button type="submit" disabled={isLoading && true} className="btn text-xl bg-mainColor text-white hover:bg-darkColor">{ isLoading ? "Creating..." : "Submit"}</button>
                            </div>
                        </form>
                    </Modal>
                </>
                <>
                    <div className="overflow-x-auto shadow mt-4 rounded-md bg-white">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th className="font-semibold text-lg">Date</th>
                                    <th className="font-semibold text-lg">ID</th>
                                    <th className="font-semibold text-lg">Email</th>
                                    <th className="font-semibold text-lg">Password</th>
                                    <th className="font-semibold text-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {admins.length > 0 ? admins?.map(a =>
                                        <tr key={a?._id} className="text-lg">
                                            <td>{a?.createdAt}</td>
                                            <td>{a?._id}</td>
                                            <td>{a?.email}</td>
                                            <td>{a?.password}</td>
                                            <td className="flex gap-2 items-center">
                                                <button onClick={() => handleUpdateById(a?._id)} className="text-green-700 bg-green-200 p-2 rounded-md text-xl"><FiEdit /></button>
                                                <button onClick={() => handleDeleteById(a?._id)} className="text-red-700 bg-red-200 p-2 rounded-md text-xl"><FaRegTrashAlt /></button>
                                            </td>
                                        </tr>
                                    ) : <strong className="m-4 text-xl">Loading...</strong>}
                                </>
                            </tbody>
                        </table>
                    </div>
                </>
            </div>
            <AdminEditModal
                closeModal2={closeModal2}
                isModalOpen2={isModalOpen2}
                editAdmin={editAdmin}
                setDataUpdated={setDataUpdated}
            />
        </>
    );
};

export default Admin;