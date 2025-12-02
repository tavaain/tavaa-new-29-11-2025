import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { uploadCloudinary } from "../../../utils/imageUpload";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import ProductEditModal from "./ProductEditModal";
import Modal from "../../../AllComponents/Shared/Modal";

const AddProduct = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("token");

  // ✅ FIXED SUBMIT FUNCTION
  const onSubmit = async (data) => {
    try {
      const name = data.name.trim();
      const description = data.description.trim();
      const price = parseInt(data.price);
      const category = data.category;
      const discount = parseInt(data.discount);
      const discountPrice = Math.round(price - (price * discount) / 100);

      // ✅ Fix: `size` should be a string split, not parseInt
      const sizeArray = data.size
        .split(",")
        .map((s) => s.trim().toLowerCase());

      // ✅ Fix: ComingSoon should be a boolean, not parsed int
      const ComingSoon = data.ComingSoon === "true";

      const postData = {
        name,
        category,
        price,
        description,
        links,
        discountPrice,
        discount,
        size: sizeArray,
        ComingSoon,
      };

      const response = await axios.post(
        "https://myproject-tau-brown.vercel.app/api/product",
        postData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success("✅ Product added successfully");
        reset();
        closeModal();
        setLinks([]);
        setDataUpdated((prev) => !prev);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding product");
    }
  };

  // ✅ Upload image to Cloudinary
  const handleFileChange = async (e) => {
    try {
      const selectedFiles = Array.from(e.target.files);
      setIsLoading(true);
      const arr = [];

      for (const file of selectedFiles) {
        const data = await uploadCloudinary(file);
        arr.push(data);
      }

      setLinks((prev) => [...prev, ...arr]);
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Remove image
  const handleRemoveFile = async (publicId) => {
    try {
      const res = await axios.delete("https://myproject-tau-brown.vercel.app/api/deleteImage", {
        data: { publicId },
      });
      if (res.status === 200) {
        setLinks((prev) => prev.filter((link) => link.publicId !== publicId));
        toast.success("🗑️ Image deleted");
      }
    } catch (error) {
      toast.error("Error deleting image");
    }
  };

  // ✅ Delete product by ID
  const handleDeleteById = async (id) => {
    try {
      const res = await axios.delete(
        `https://myproject-tau-brown.vercel.app/api/product/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        toast.success("Deleted successfully");
        setDataUpdated((prev) => !prev);
        await axios.delete(`https://myproject-tau-brown.vercel.app/api/comment/${id}`);
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  // ✅ Open Edit Modal
  const handleUpdateById = (id) => {
    const findProduct = products.find((p) => p._id === id);
    setEditProduct(findProduct);
    openModal2();
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://myproject-tau-brown.vercel.app/api/category/name");
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://myproject-tau-brown.vercel.app/api/products", {
          params: { page, limit },
        });
        setProducts(res.data?.data?.reverse() || []);
        setTotalPages(res.data?.totalPages || 1);
        setTotalItems(res.data?.totalItems || 0);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [page, limit, dataUpdated]);

  useEffect(() => {
    document.title = "Dashboard | Products";
  }, []);

  return (
    <div className="mx-4">
      <Toaster />
      <button
        onClick={openModal}
        className="bg-mainText text-white btn text-lg hover:bg-darkColor rounded-lg"
      >
        Add New Product
      </button>

      {/* ✅ ADD PRODUCT MODAL */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Product name"
              className="input input-bordered text-amber-50 text-lg"
            />
          </div>

          <div className="flex sm:flex-col md:flex-row gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-medium">Category</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="text-amber-50 select select-bordered w-full text-lg"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-medium">Price*</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Enter price"
                className="text-amber-50 input input-bordered text-lg"
              />
            </div>
          </div>

          <div className="flex sm:flex-col md:flex-row gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-medium">
                  Coming Soon
                </span>
              </label>
              <select
                {...register("ComingSoon", { required: true })}
                className="text-amber-50 select select-bordered w-full text-lg"
              >
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-medium">Discount%</span>
              </label>
              <input
                {...register("discount", { required: true })}
                type="number"
                placeholder="e.g. 25"
                className="input input-bordered text-lg text-amber-50"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-medium">Size*</span>
            </label>
            <input
              {...register("size", { required: true })}
              type="text"
              placeholder="m,s,xl,l"
              className="input input-bordered text-lg text-amber-50"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Images*</span>
              <span className="label-text text-sm">
                (Upload 4–5 images, max 1MB each)
              </span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-xs text-lg"
              multiple
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {links.map((link, index) => (
                <div key={index} className="relative w-16 h-16">
                  <img
                    src={link.url}
                    alt={`preview-${index}`}
                    className="rounded object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(link.publicId)}
                    className="absolute top-0 right-0 text-red-600 text-xl"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              ))}
              {isLoading && (
                <span className="text-green-700 font-semibold">Uploading...</span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered textarea-lg px-2 py-0 text-amber-50"
              placeholder="Product description"
            ></textarea>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="btn text-xl bg-mainColor"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {/* ✅ PRODUCT TABLE */}
      <div className="overflow-x-auto shadow mt-4 rounded-md bg-white">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>D-%</th>
              <th>Disc. Price</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className="text-lg">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={
                        product?.links?.[0]?.url || "/placeholder.jpg"
                      }
                      alt="product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.discount}%</td>
                  <td>{product.discountPrice}</td>
                  <td>{product.price}</td>
                  <td className="flex gap-2 items-center">
                    <button
                      onClick={() => handleUpdateById(product._id)}
                      className="text-green-700 bg-green-200 p-2 rounded-md text-xl"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteById(product._id)}
                      className="text-red-700 bg-red-200 p-2 rounded-md text-xl"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-xl p-4">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-primary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages} — Total Items: {totalItems}
        </span>
        <button
          className="btn btn-primary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <ProductEditModal
        closeModal2={closeModal2}
        isModalOpen2={isModalOpen2}
        editProduct={editProduct}
        categories={categories}
        setDataUpdated={setDataUpdated}
      />
    </div>
  );
};

export default AddProduct;
