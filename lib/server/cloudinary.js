import { v2 as cloudinary } from "cloudinary";

export const ensureCloudinary = () => {
  if (!cloudinary.config().api_key) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  return cloudinary;
};

export const uploadDataUrl = async (dataUrl, folder) => {
  if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) return dataUrl;
  ensureCloudinary();
  const res = await cloudinary.uploader.upload(dataUrl, {
    folder: folder || "uploads",
    overwrite: false,
  });
  return res.secure_url || res.url || "";
};
