import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { uploadCloudinary } from "../../../utils/imageUpload";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import EditModal from "./EditModal";
import Modal from "../../../AllComponents/Shared/Modal";

const AddCategory = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState({});
  const [dataUpdated, setDataUpdated] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    const name = data.name;
      const postData = { name, links };  

    try {
      const response = await axios.post(
        "https://myproject-tau-brown.vercel.app/api/category",
        postData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success("Category Create successfully");
        reset();
        closeModal();
        setDataUpdated((prev) => !prev); // Toggle the state to trigger useEffect
        setLinks([])
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

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
      setLinks((prevLinks) => [...prevLinks, ...arr]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // remove image from Cloudinary
  const handleRemoveFile = async (publicId) => {
    try {
      const response = await axios.delete(
        "https://myproject-tau-brown.vercel.app/api/deleteImage",
        { data: { publicId } }
      );
      if (response.status === 200) {
        const filterImage = links.filter((link) => link.publicId !== publicId);
        setLinks(filterImage);
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error) {
      toast.error("Error deleting image:", error);
    }
  };

  // Delete category with images by id
  const handleDeleteById = async (id) => {
    const findLinks = categories?.find((c) => c?._id === id)?.links;
    try {
      const response = await axios.delete(
        `https://myproject-tau-brown.vercel.app/api/category/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success("Deleted successfully");
        setDataUpdated((prev) => !prev); // Toggle the state to trigger useEffect
        if (findLinks !== undefined) {
          for (let i = 0; i < findLinks?.length; i++) {
            const publicId = findLinks[i]?.publicId;
            await axios.delete("https://myproject-tau-brown.vercel.app/api/deleteImage", {
              data: { publicId },
            });
          }
        }
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting:", error);
    }
  };

  // Update category
  const handleUpdateById = (id) => {
    openModal2();
    const findCategory = categories?.find((c) => c?._id === id);
    setEditCategory(findCategory);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://myproject-tau-brown.vercel.app/api/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [dataUpdated]);

  useEffect(() => {
    document.title = "Dashboard | Category";
  }, []);

  return (
    <>
      <Toaster />
      <div className="mx-4 md:mx-auto lg:w-3/4">
        <>
          <button
            onClick={openModal}
            className="bg-mainColor text-white btn text-lg hover:bg-darkColor rounded-lg"
          >
            Add New Category
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {/* <h2 className="text-xl font-bold">Add Product</h2> */}
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium ">
                    Name: *
                  </span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  placeholder="Name here..."
                  className="input input-bordered text-lg text-amber-50"
                  required
                />
              </div>

           

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium ">
                    Images: *
                  </span>
                  <span className="label-text">
                    Max: upload 1 image / Size: 1MB mx
                  </span>
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full max-w-xs text-lg"
                  multiple
                />

                <div className="avatar gap-2 mt-2">
                  {links &&
                    links.map((link, index) => (
                      <div key={index} className="w-14 rounded">
                        <img src={link.url} alt={`file preview ${index}`} />
                        <span
                          className="bottom-1 cursor-pointer absolute text-2xl text-red-600"
                          onClick={() => handleRemoveFile(link.publicId)}
                        >
                          <MdDeleteForever />
                        </span>
                      </div>
                    ))}
                  {isLoading && (
                    <span className="text-green-700 font-semibold">
                      Uploading...
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 mx-auto">
                <button
                  type="submit"
                  disabled={isLoading && true}
                  className="text-xl bg-mainColor text-white btn btn-active btn-success hover:bg-emerald-400"
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        </>

        <>
          <div className="overflow-x-auto  shadow  mt-4 rounded-md bg-white">
            <table className="table table-sm">
              {/* head */}
              <thead>
                <tr>
                  <th className="font-semibold text-lg border border-black">Image</th>
                  <th className="font-semibold text-lg border border-black">Name</th>
                  <th className="font-semibold text-lg border border-black">CategorySection</th>
                  <th className="font-semibold text-lg border border-black">Action</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {categories.length > 0 ? (
                    categories?.map((category) => (
                      <tr key={category._id} className="text-lg text-black">
                        <td className="border border-black">
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask rounded w-16 ">
                                {category.links && category.links.length > 0 ? (
                                  <img
                                    className="object-cover"
                                    src={category.links[0].url}
                                    alt="Photo"
                                  />
                                ) : (
                                  <span>No image</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="border border-black">{category.name}</td>
                        <td className="border border-black">{category.categorySection}</td>
                        <td className="flex gap-2 items-center">
                          <button
                            onClick={() => handleUpdateById(category._id)}
                            className="text-green-700 bg-green-200 p-2 rounded-md text-xl"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteById(category._id)}
                            className="text-red-700 bg-red-200 p-2 rounded-md text-xl"
                          >
                            <FaRegTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <strong className="m-4 text-xl">Loading...</strong>
                  )}
                </>
              </tbody>
            </table>
          </div>
        </>
      </div>
      <EditModal
        closeModal2={closeModal2}
        isModalOpen2={isModalOpen2}
        editCategory={editCategory}
        setDataUpdated={setDataUpdated}
      />
    </>
  );
};

export default AddCategory;
