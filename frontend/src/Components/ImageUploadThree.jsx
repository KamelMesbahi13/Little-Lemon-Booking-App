import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useUploadProductImageMutation } from "../Redux/Api/productApiSlice";
import PropTypes from "prop-types";

const ImageUploadOne = ({ setImage, setImageUrl }) => {
  const { t } = useTranslation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [isLoading, setIsLoading] = useState(false);

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) {
  //     toast.error(t("toast_img_required"));
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image_three", file);

  //   setIsLoading(true);
  //   try {
  //     const res = await uploadProductImage(formData).unwrap();
  //     setImage(res.image_three);
  //     setImageUrl(res.image_three);
  //     toast.success(t("toast_img_uploaded"));
  //   } catch (error) {
  //     toast.error(error?.data?.message || error.error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error(t("toast_img_required"));
      return;
    }

    const formData = new FormData();
    formData.append("image_three", file);

    setIsLoading(true);
    try {
      const res = await uploadProductImage(formData).unwrap();
      const uploadedImageUrl = res.files.image_three[0].path;
      setImage(uploadedImageUrl); // Save the URL to state
      setImageUrl(uploadedImageUrl); // Update preview
      toast.success(t("toast_img_uploaded"));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block px-4 py-3 font-bold text-center text-white border rounded-lg cursor-pointer bg-mainColor">
        {isLoading ? t("loading") : t("product_list_upload_img")} 3
        <input
          type="file"
          name="image_three"
          accept="image/*"
          onChange={uploadFileHandler}
          className="hidden"
          required
        />
      </label>
    </div>
  );
};

ImageUploadOne.propTypes = {
  setImage: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
};

export default ImageUploadOne;
