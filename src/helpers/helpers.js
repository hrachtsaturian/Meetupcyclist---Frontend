import ImagesAPI from "../api/ImagesAPI";

export const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateMY = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const isPastEvent = (event) => {
  return new Date(event.date) < new Date();
};

export const uploadImage = async (event, setFormData, setError) => {
  const imageForm = new FormData();
  const imageFile = event.target.files[0];
  imageForm.append("image", imageFile);
  try {
    if (imageFile.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5 MB");
    }
    const imageUrl = await ImagesAPI.uploadImage(imageForm);
    setFormData((formData) => ({ ...formData, pfpUrl: imageUrl }));
  } catch (e) {
    setError(e?.message || "Failed to upload image");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { formatDate, formatDateMY, isPastEvent, uploadImage };
