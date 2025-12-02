import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadCloudinary } from "../../../utils/imageUpload";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../../../AllComponents/Shared/Modal";

const ProductEditModal = ({
  isModalOpen2,
  closeModal2,
  editProduct,
  categories,
  setDataUpdated,
}) => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Initialize links state when editProduct changes
  useEffect(() => {
    if (editProduct && editProduct?.links) {
      setLinks([...editProduct.links]);
    }
  }, [editProduct]);

  // const size = editProduct?.size === "" ? "" : editProduct?.size?.join(",");
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    const name = data.name;
    const description = data.description;
    const price = parseInt(data.price);
    const category = data.category;
    const discount = parseInt(data?.discount);
    const discountPrice = Math.round( price - (price * discount) / 100);

    const postData = {
      name,
      category,
      price,
      description,
      discountPrice,
      discount,
      links: links.length > 0 ? links : editProduct?.links,
    };
    // console.log(postData);

    try {
      const response = await axios.patch(
        `https://myproject-tau-brown.vercel.app/api/product/${editProduct?._id}`,
        postData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success("Product updated successfully");
        reset();
        closeModal2();
        setLinks([]);
        setDataUpdated((prev) => !prev); // Toggle the state to trigger useEffect
      } else {
        toast.error("Failed to updated product");
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
      // setLinks(prevLinks => [...prevLinks, ...arr, ...links]);
      setLinks((prevLinks) => [
        ...prevLinks.filter(
          (link) => !arr.some((file) => file.publicId === link.publicId)
        ),
        ...arr,
      ]);
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
        const filteredLinks = links.filter(
          (link) => link.publicId !== publicId
        );

        const postData = { links: filteredLinks };
        const updateResponse = await axios.patch(
          `https://myproject-tau-brown.vercel.app/api/product/${editProduct?._id}`,
          postData,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        if (updateResponse.status === 200) {
          setLinks(filteredLinks);
          toast.success("Image deleted successfully");
        } else {
          toast.error("Failed to update product with deleted image");
        }
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error) {
      toast.error("Error deleting image:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen2} onClose={closeModal2}>
        {/* <h2 className="text-xl font-bold">Add Product</h2> */}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium ">Name:</span>
            </label>
            <input
              {...register("name", { required: true })}
              defaultValue={editProduct?.name}
              type="text"
              name="name"
              placeholder="name here"
              className="input input-bordered text-lg"
              required
            />
          </div>

          <div className="flex sm:flex-col md:flex-row justify-between gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-medium ">
                  Category
                </span>
              </label>
              <select
                {...register("category", { required: true })}
                defaultValue={editProduct?.category}
                name="category"
                className="select select-bordered w-full  text-lg"
              >
                <option disabled selected>
                  Select category
                </option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-medium ">Price</span>
              </label>
              <input
                {...register("price", { required: false })}
                defaultValue={editProduct?.price}
                type="number"
                name="price"
                placeholder="price here"
                className="input input-bordered text-lg"
                required
              />
            </div>
          </div>

          <div className="flex sm:flex-col md:flex-row justify-between gap-4">
            <div
              className="form-control w-full"
              title="Default price: 500 | xl/md: 500"
            >
              <label className="label">
                <span className="label-text text-lg font-medium ">
                  Discount*{" "}
                  <span className="text-base font-normal">
                    {"(Default price Discount)"}
                  </span>
                </span>
              </label>
              <input
                {...register("discount", { required: true })}
                type="number"
                name="discount"
                defaultValue={editProduct?.discount}
                placeholder="discount here like 25"
                className="input input-bordered text-lg"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium ">Images: *</span>
              <span className="label-text">
                Max: upload 4-5 images / Size: 1MB per
              </span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-xs text-lg"
              multiple
            />

            <div className="avatar gap-2 mt-2">
              {
                // links.length > 0 ? (
                links?.map((link, index) => (
                  <div key={index} className="w-14 rounded">
                    <img src={link.url} alt={`file preview ${index}`} />
                    <span
                      className="bottom-1 cursor-pointer absolute text-2xl text-red-600"
                      onClick={() => handleRemoveFile(link.publicId)}
                    >
                      <MdDeleteForever />
                    </span>
                  </div>
                ))
              }
              {isLoading && (
                <span className="text-green-700 font-semibold">
                  Uploading...
                </span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium ">
                Description
              </span>
            </label>
            <textarea
              {...register("description", { required: true })}
              defaultValue={editProduct?.description}
              name="description"
              className="textarea textarea-bordered textarea-lg px-2 py-0"
              placeholder="Bio"
            ></textarea>
          </div>

          <div className="mt-6 mx-auto">
            <button
              type="submit"
              disabled={isLoading && true}
              className="btn text-xl bg-mainColor"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProductEditModal;
