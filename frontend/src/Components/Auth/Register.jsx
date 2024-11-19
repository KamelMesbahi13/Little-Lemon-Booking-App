import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Ui/Loader/Loader";
import { useRegisterMutation } from "../../Redux/Api/usersApiSlice";
import { setCredentials } from "../../Redux/Features/Auth/AuthSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const ToLoginHandle = () => {
    window.scrollTo(0, 0);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setPasswordError(true);
      toast.error(t("password_not_match"));
    } else {
      setPasswordError(false);
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("user_registered");
      } catch (err) {
        toast.error(err.message || t("error_occurred"));
      }
    }
  };

  const renderInput = (type, name, placeholder) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full mt-5 rounded-md text-backgroundColor focus:outline-none bg-[#eee] px-5 py-3"
      value={formData[name]}
      onChange={handleChange}
    />
  );

  return (
    <div>
      <div className="mt-12 textCenter md:mt-20">
        <h1>{t("register")}</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="md:w-1/2 w-3/4 p-12 mt-8 border border-[#eee] shadow-xl">
          <form className="mb-8 text-center md:mb-0" onSubmit={submitHandler}>
            {renderInput("text", "username", `${t("form_name")}`)}
            {renderInput("email", "email", `${t("form_email")}`)}
            {renderInput("password", "password", `${t("password")}`)}
            {renderInput(
              "password",
              "confirmPassword",
              `${t("confirm_password")}`
            )}
            {passwordError && (
              <p className="mt-2 text-sm text-red">
                {t("password_confirm_not_match")}
              </p>
            )}
            <div className="mt-8">
              <button disabled={isLoading} type="submit" className="button">
                {t("send_button")}
              </button>
              {isLoading && <Loader />}
            </div>
          </form>
          <div className="mt-4">
            <p>
              {t("already_have_account")}{" "}
              <Link
                onClick={ToLoginHandle}
                to={
                  redirect
                    ? `/S3cure-c0nn3ct10n_4d71f9?redirect=${redirect}`
                    : "/S3cure-c0nn3ct10n_4d71f9"
                }
                className="mx-2 font-bold hover:underline text-mainColor"
              >
                {t("login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
