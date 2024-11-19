import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../Redux/Features/Auth/AuthSlice";
import { useProfileMutation } from "../../Redux/Api/usersApiSlice";
import Loader from "../../Components/Ui/Loader/Loader";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      username: userInfo.username || "",
      email: userInfo.email || "",
    }));
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password && password !== confirmPassword) {
      return toast.error(t("passwords_mismatch")); // Use translation for error message
    }

    try {
      const updateData = {
        _id: userInfo._id,
        username,
        email,
      };

      if (password) {
        updateData.password = password;
      }

      const res = await updateProfile(updateData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(t("profile_updated")); // Use translation for success message
    } catch (err) {
      toast.error(err?.data?.message || err.message || t("error_occurred")); // Use translation for error message
    }
  };

  const renderInput = (type, name, placeholderKey) => (
    <input
      type={type}
      name={name}
      placeholder={t(placeholderKey)} // Translate placeholder
      className="w-full mt-5 rounded-md text-backgroundColor focus:outline-none bg-[#eee] px-5 py-3"
      value={formData[name]}
      onChange={handleChange}
    />
  );

  return (
    <div>
      <div className="mt-12 textCenter md:mt-20">
        <h1>{t("profile_header")}</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-1/2 p-12 mt-8 border border-[#eee] shadow-xl">
          <form className="mb-8 text-center md:mb-0" onSubmit={submitHandler}>
            {renderInput("text", "username", "username_placeholder")}{" "}
            {/* Placeholder key for translation */}
            {renderInput("email", "email", "email_placeholder")}{" "}
            {/* Placeholder key for translation */}
            {renderInput("password", "password", "password_placeholder")}{" "}
            {/* Placeholder key for translation */}
            {renderInput(
              "password",
              "confirmPassword",
              "confirm_password_placeholder"
            )}{" "}
            {/* Placeholder key for translation */}
            <div className="mt-8"></div>
            <div className="flex justify-between">
              <button type="submit" className="button">
                {t("send_button")}
              </button>
            </div>
          </form>
          {loadingUpdateProfile && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
