import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useUploadProductImageMutation } from "../Redux/Api/productApiSlice";
import PropTypes from "prop-types";

const ImageUploadFour = ({ setImage, setImageUrl }) => {
  const { t } = useTranslation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [isLoading, setIsLoading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error(t("toast_img_required"));
      return;
    }

    const formData = new FormData();
    formData.append("image_four", file);

    setIsLoading(true);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image_four);
      t;
      setImageUrl(res.image_four);
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
        {isLoading ? t("loading") : t("product_list_upload_img")} 4
        <input
          type="file"
          name="image_four"
          accept="image/*"
          onChange={uploadFileHandler}
          className="hidden"
          required
        />
      </label>
    </div>
  );
};

ImageUploadFour.propTypes = {
  setImage: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
};

export default ImageUploadFour;
