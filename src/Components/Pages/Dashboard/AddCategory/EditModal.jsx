import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { uploadCloudinary } from '../../../utils/imageUpload';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from '../../../AllComponents/Shared/Modal';

const EditModal = ({ isModalOpen2, closeModal2, editCategory, setDataUpdated }) => {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        if (editCategory && editCategory?.links) {
            setLinks([...editCategory.links]);
        }
    }, [editCategory]);

    const token = localStorage.getItem("token");

    const onSubmit = async (data) => {
        const name = data.name;
        const description = data.description;
        const postData = { name, description, links: links.length > 0 ? links : editCategory?.links };
        
        try {
            const response = await axios.patch(`https://myproject-tau-brown.vercel.app/api/category/${editCategory?._id}`, postData, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success("Updated successfully");
                reset();
                closeModal2();
                setDataUpdated(prev => !prev); // Toggle the state to trigger useEffect
            } else {
                toast.error("Failed to update category")
            }
        } catch (error) {
            toast.error('Error update:', error);
        }
    }

    // upload image in  Cloudinary
    const handleFileChange = async (e) => {
        try {
            const selectedFiles = Array.from(e.target.files);
            setIsLoading(true);
            let arr = [];

            // Upload each file to Cloudinary
            for (let i = 0; i < selectedFiles.length; i++) {
                const data = await uploadCloudinary(selectedFiles[i]);
                arr.push(data);
            }

            // Update the links state with the URLs of the uploaded images
            // setLinks(prevLinks => [...prevLinks, ...arr, ...editCategory.links]);
            setLinks(prevLinks => [...prevLinks.filter(link => !arr.some(file => file.publicId === link.publicId)), ...arr]);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    // remove image from Cloudinary
    const handleRemoveFile = async (publicId) => {
        try {
            const response = await axios.delete('https://myproject-tau-brown.vercel.app/api/deleteImage', { data: { publicId } });
            if (response.status === 200) {
                const filteredLinks = links.filter(link => link.publicId !== publicId);

                const postData = { links: filteredLinks };
                const updateResponse = await axios.patch(`https://myproject-tau-brown.vercel.app/api/category/${editCategory?._id}`, postData, {
                    headers: { authorization: `Bearer ${token}` }
                });

                if (updateResponse.status === 200) {
                    setLinks(filteredLinks);
                    toast.success("Image deleted successfully");
                } else {
                    toast.error("Failed to update product with deleted image");
                }
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
                {/* <h2 className="text-xl font-bold">Add Product</h2> */}
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium ">Name: *</span>
                        </label>
                        <input {...register("name", { required: true })} defaultValue={editCategory?.name} type="text" name="name" placeholder="Name here..." className="input input-bordered text-lg" required />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium ">Images: *</span>
                            <span className="label-text">Max: upload 4-5 images / Size: 1MB per</span>
                        </label>
                        <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs text-lg" multiple />

                        <div className="avatar gap-2 mt-2">
                            {links.length > 0 ? (
                                links?.map((link, index) => (
                                    <div key={index} className="w-14 rounded">
                                        <img src={link.url} alt={`file preview ${index}`} />
                                        <span className="bottom-1 cursor-pointer absolute text-2xl text-red-600" onClick={() => handleRemoveFile(link.publicId)}><MdDeleteForever /></span>
                                    </div>
                                ))
                            ) : (
                                editCategory?.links?.map((link, index) => (
                                    <div key={index} className="w-14 rounded">
                                        <img src={link.url} alt={`file preview ${index}`} />
                                        <span className="bottom-1 cursor-pointer absolute text-2xl text-red-600" onClick={() => handleRemoveFile(link.publicId)}><MdDeleteForever /></span>
                                    </div>
                                    ))
                                )
                            }

                            {isLoading && <span className="text-green-700 font-semibold">Uploading...</span>}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium ">Description:</span>
                        </label>
                        <textarea {...register("description", { required: false })}
                            defaultValue={editCategory?.description}
                            name="description" className="textarea textarea-bordered textarea-lg px-2 py-0" placeholder="Description (optional)"></textarea>
                    </div>

                    <div className="mt-6 mx-auto">
                        <button type="submit" disabled={isLoading && true} className="btn text-xl bg-mainColor text-white hover:bg-darkColor">Submit</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default EditModal;