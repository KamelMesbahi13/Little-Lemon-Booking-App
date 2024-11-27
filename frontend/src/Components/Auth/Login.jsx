import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Ui/Loader/Loader";
import { useLoginMutation } from "../../Redux/Api/usersApiSlice";
import { setCredentials } from "../../Redux/Features/Auth/AuthSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState(""); // For detailed validation messages

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
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
    setValidationError(""); // Reset validation error when user changes input
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(t("login_successful"));

      navigate(redirect);
    } catch (err) {
      setValidationError(err?.data?.message || `${t("password_not_match")}`); // Set error message
      toast.error(t("password_not_match"));
    }
  };

  const renderInput = (type, name, placeholder) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`w-full mt-5 rounded-md text-backgroundColor focus:outline-none bg-[#eee] px-5 py-3 ${
        validationError ? "border-red" : ""
      }`}
      value={formData[name]}
      onChange={handleChange}
    />
  );

  // const ToRegisterHandle = () => {
  //   window.scrollTo(0, 0);
  // };

  return (
    <div>
      <div className="mt-12 textCenter md:mt-20">
        <h1> {t("login")}</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="md:w-1/2 w-3/4 p-12 mt-8 border border-[#eee] shadow-xl">
          <form className="mb-8 text-center md:mb-0" onSubmit={submitHandler}>
            {renderInput("email", "email", `${t("form_email")}`)}
            {renderInput("password", "password", `${t("password")}`)}

            {validationError && (
              <div className="mt-2 text-sm text-red ">{validationError}</div>
            )}

            <div className="mt-8">
              <button disabled={isLoading} type="submit" className="button">
                {t("send_button")}
              </button>
              {isLoading && !validationError && <Loader />}{" "}
            </div>
          </form>
          {/* <div className="mt-4">
            <p>
              {t("dont_have_account")}
              <Link
                onClick={ToRegisterHandle}
                to={redirect ? `/Inscrire?redirect=${redirect}` : "/Inscrire"}
                className="mx-2 font-bold hover:underline text-mainColor"
              >
                {t("register")}
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
