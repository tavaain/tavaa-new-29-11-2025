import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { uploadCloudinary } from "../../../utils/imageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../../../AllComponents/Shared/Modal";

const SliderEditModal = ({ isModalOpen2, closeModal2, editSlider, setDataUpdated }) => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm()
    // console.log(file);

    useEffect(() => {
        if (editSlider && editSlider?.image) {
            setFile({ ...editSlider?.image });
            setImagePreview(editSlider?.image?.url)
        }
    }, [editSlider]);

    const token = localStorage.getItem("token");

    const onSubmit = async (data) => {
        setIsLoading(true);
       
        
        try {
             const imageData = file.url ? file : await uploadCloudinary(file);
             const title = data.title;
             const postData = { title, image: imageData }
             const response = await axios.patch(`https://myproject-tau-brown.vercel.app/api/slider/${editSlider?._id}`, postData, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success("Slider updated successfully");
                reset();
                setIsLoading(false);
                closeModal2();
                setDataUpdated(prev => !prev); // Toggle the state to trigger useEffect
            } else {
                setIsLoading(false);
                toast.error("Failed to update")
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

    const handleRemoveFile = async () => {
        const publicId = editSlider?.image?.publicId;
        try {
            setIsLoading(true);
            const response = await axios.delete('https://myproject-tau-brown.vercel.app/api/deleteImage', { data: { publicId } });
            if (response.status === 200) {
                setIsLoading(false);
                toast.success("Delete successfully");
                setImagePreview(null)
                setFile(null);
            } else {
                toast.error("Failed to delete image")
            }
        } catch (error) {
            toast.error('Error deleting image:', error);
        }
    };

   
    return (
        <>
            <Modal isOpen={isModalOpen2} onClose={closeModal2}>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium ">Title:</span>
                            </label>
                            <input {...register("title", { required: true })} defaultValue={editSlider?.title} type="text" name="title" placeholder="name here" className="input input-bordered text-lg" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium ">Image: *</span>
                                <span className="label-text">One image only / Size: 1MB max</span>
                            </label>
                            <input type="file" onChange={handleFileChange} disabled={imagePreview && true} name="file" className="file-input file-input-bordered w-full max-w-xs text-lg" />

                            <div className="avatar gap-2 mt-2">
                                {imagePreview && <div className="w-14 rounded">
                                    <img src={imagePreview} alt={`file preview`} />
                                    <span className="bottom-1 cursor-pointer absolute text-2xl text-red-600" onClick={() => handleRemoveFile()}><MdDeleteForever /></span>
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
    );
};

export default SliderEditModal;