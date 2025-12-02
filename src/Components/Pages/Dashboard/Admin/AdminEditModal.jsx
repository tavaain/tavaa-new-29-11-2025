import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Modal from "../../../AllComponents/Shared/Modal";


const AdminEditModal = ({ isModalOpen2, closeModal2, editAdmin, setDataUpdated }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm()

    const token = localStorage.getItem("token");

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const postData = { email, password };

        try {
            setIsLoading(true)
            const response = await axios.patch(`https://myproject-tau-brown.vercel.app/api/admin/${editAdmin?._id}`, postData, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success("Admin Update successfully");
                setIsLoading(false)
                reset();
                closeModal2();
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

    return (
        <>
            <Modal isOpen={isModalOpen2} onClose={closeModal2}>
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-medium ">Email: *</span>
                                </label>
                                <input {...register("email", { required: true })} defaultValue={editAdmin?.email} type="email" name="email" placeholder="Email here..." className="input input-bordered text-lg" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-medium ">Password: *</span>
                                </label>
                                <input {...register("password", { required: true })} type="text" name="password" placeholder="New password here..." className="input input-bordered text-lg" required />
                            </div>
                            <div className="mt-6 mx-auto">
                                <button type="submit" disabled={isLoading && true} className="btn text-xl bg-mainColor text-white hover:bg-darkColor">{ isLoading ? "Updating..." : "Update"}</button>
                            </div>
                        </form>
                    </Modal>
        </>
    );
};

export default AdminEditModal;