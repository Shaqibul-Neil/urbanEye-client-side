import axios from "axios";

const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const imageData = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
    formData
  );
  const photoURL = imageData?.data?.data?.display_url;
  return photoURL;
};

export default imageUpload;
