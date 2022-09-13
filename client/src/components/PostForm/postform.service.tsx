import axios from "axios";
import { toast } from "react-toastify";

export const uploadImage = async (
  selectedFile: File | null,
  preview: string | null
) => {
  if (!selectedFile && !preview) {
    toast.info("Provide an image");
    throw new Error("No image provided");
  }

  const file = new FormData();

  file.append("file", selectedFile!);
  file.append("upload_preset", "coj4xatn");
  const data = await axios.post(
    "https://api.cloudinary.com/v1_1/dytxhiwd5/image/upload",
    file
  );

  return data;
};
