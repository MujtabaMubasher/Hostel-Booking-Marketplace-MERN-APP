export const uploadImage = async (image, upload_preset) => {
  console.log("image :>> ", image);
  const cloudinaryApi =
    "https://api.cloudinary.com/v1_1/dicm4zjvb/image/upload";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", upload_preset);
  formData.append("cloud_name", "dicm4zjvb");
  let imageUrl = "";
  try {
    console.log("formData :>> ", formData);
    const res = await fetch(cloudinaryApi, {
      method: "POST",
      body: formData,
    });
    const response = await res.json();
    console.log(response);

    if (response.asset_id) {
      console.log("ok");
      imageUrl = { public_id: response.public_id, url: response.url };
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error, "error");
  }
  return imageUrl;
};
