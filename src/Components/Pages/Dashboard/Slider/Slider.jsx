import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { uploadCloudinary } from "../../../utils/imageUpload";
import { MdDeleteForever } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SliderEditModal from "./SliderEditModal";
import Modal from "../../../AllComponents/Shared/Modal";


const Slider = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [sliders, setSliders] = useState([]);
    const [editSlider, setEditSlider] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);

    const { register, handleSubmit, reset } = useForm()
    const token = localStorage.getItem("token");

    const onSubmit = async (data) => {
        setIsLoading(true);
        
        try {
             const title = data.title;
            const imageData = file.url ? file : await uploadCloudinary(file);

            
            const postData = { title, image: imageData }
            const response = await axios.post('https://myproject-tau-brown.vercel.app/api/slider', postData, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success("Slider added successfully");
                reset();
                setIsLoading(false);
                closeModal();
                setDataUpdated(prev => !prev); // Toggle the state to trigger useEffect
            } else {
                setIsLoading(false);
                toast.error("Failed to added product")
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Error:', error);
        }
    }

    // upload image in  Cloudinary
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Delete category with images by id
    const handleDeleteById = async (id) => {
        try {
            const response = await axios.delete(`https://myproject-tau-brown.vercel.app/api/slider/${id}`, {
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

    // Update product
    const handleUpdateById = (id) => {
        openModal2();
        const findSlider = sliders?.find(c => c?._id === id);
        setEditSlider(findSlider);
    }

    useEffect(() => {
        const fetchSlider = async () => {
            try {
                const res = await axios.get('https://myproject-tau-brown.vercel.app/api/slider');
                setSliders(res.data);
            } catch (error) {
                console.error('Failed to fetch slider:', error);
            }
        };

        fetchSlider();
    }, [dataUpdated])

    useEffect(() => { 
        document.title = "Dashboard | Slider";
     }, []);

    return (
        <div className="mx-4">
            <Toaster />
            <>
                <button onClick={openModal} className="bg-mainColor text-white btn text-lg hover:bg-darkColor rounded-lg">
                    Add New Slider
                </button>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium ">Title:</span>
                            </label>
                            <input {...register("title", { required: true })} type="text" name="title" placeholder="name here" className="input input-bordered text-lg" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium ">Images: *</span>
                                <span className="label-text">One image only / Size: 1MB per</span>
                            </label>
                            <input type="file" onChange={handleFileChange} name="file" className="file-input file-input-bordered w-full max-w-xs text-lg" />

                            <div className="avatar gap-2 mt-2">
                                {imagePreview && <div className="w-14 rounded">
                                    <img src={imagePreview} alt={`file preview`} />
                                    <span className="bottom-1 cursor-pointer absolute text-2xl text-red-600" onClick={() => setImagePreview(null)}><MdDeleteForever /></span>
                                </div>}
                                
                            </div>
                        </div>

                        <div className="mt-6 mx-auto">
                            <button disabled={isLoading && true} className="btn text-xl bg-mainColor">
                                {isLoading && <span className="loading loading-spinner"></span>}
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>
            </>


            <>
                <div className="overflow-x-auto  shadow  mt-4 rounded-md bg-white">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="font-semibold text-lg">Image</th>
                                <th className="font-semibold text-lg">Name</th>
                                <th className="font-semibold text-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {sliders.length > 0 ? sliders.map(slide =>
                                    <tr key={slide._id} className="text-lg">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask rounded w-16 ">
                                                        <img className="object-cover" src={slide?.image?.url} alt="Photo" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{slide?.title}</td>
                                        <td className="flex gap-2 items-center">
                                            <button onClick={() => handleUpdateById(slide?._id)} className="text-green-700 bg-green-200 p-2 rounded-md text-xl"><FiEdit /></button>
                                            <button onClick={() => handleDeleteById(slide?._id)} className="text-red-700 bg-red-200 p-2 rounded-md text-xl"><FaRegTrashAlt /></button>
                                        </td>
                                    </tr>
                                ) : <strong className="m-4 text-xl">Loading...</strong>}

                            </>
                        </tbody>
                    </table>
                </div>
            </>

            <SliderEditModal
            closeModal2={closeModal2}
            isModalOpen2={isModalOpen2}
            editSlider={editSlider}
            setDataUpdated={setDataUpdated}
            />
        </div>
    );
};

export default Slider;