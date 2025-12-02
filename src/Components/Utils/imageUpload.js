import axios from "axios";

export const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tavaaimg") // your upload_preset here
    // formData.append("cloud_name", "dx7cdsfdfgrtrt")
    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/dd8xids1f/image/upload`, formData)
    return {publicId: data?.public_id, url: data?.secure_url}
}