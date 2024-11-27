import { useState } from "react";
import Data from "../../Data/Data.json";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FaXmark, FaYoutube } from "react-icons/fa6";
import TranslateIcon from "../Ui/TranslationIcon/TranslationIcon";
import { useTranslation } from "react-i18next";
import { useLogoutMutation } from "../../Redux/Api/usersApiSlice";
import { logout } from "../../Redux/Features/Auth/AuthSlice";
import { MdFavoriteBorder } from "react-icons/md";
import FavoritesCount from "../Products/FavoritesCount/FavoritesCount";
import Cart from "../Ui/Cart/Cart";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";

const Navbar = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const modifiedDataNav = Data.navbarItems.map((data) => {
    if (i18n.language === "ar") {
      return {
        id: data.id,
        ItemOne: data.ItemOne_ar,
        ItemTwo: data.ItemTwo_ar,
        ItemThree: data.ItemThree_ar,
        ItemFour: data.ItemFour_ar,
        ItemFive: data.ItemFive_ar,
      };
    }

    if (i18n.language === "fr") {
      return {
        id: data.id,
        ItemOne: data.ItemOne_fr,
        ItemTwo: data.ItemTwo_fr,
        ItemThree: data.ItemThree_fr,
        ItemFour: data.ItemFour_fr,
        ItemFive: data.ItemFive_fr,
      };
    }
    return data;
  });

  const [nav, setNav] = useState(true);

  const navHandler = () => {
    setNav(!nav);
  };

  return (
    <>
      <div id="nav">
        <div className="w-full bg-white shadow-xl md:py-4">
          <div className="container px-4 mx-auto">
            <div className="z-50 justify-between hidden w-full lg:flex">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img className="w-[12rem] h-16" src={Logo} alt="Logo" />
                  </Link>
                  <div className="flex justify-around">
                    <a
                      className="text-[#E1306C]"
                      href="https://www.instagram.com/toolsmarket.dz/"
                      target="_blank"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://www.tiktok.com/@toolsmarketdz"
                      target="_blank"
                    >
                      <FaTiktok />
                    </a>
                    <a
                      href="https://www.facebook.com/Toolsmarketdz"
                      target="_blank"
                      className="text-[#1877F2]"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      className="text-[#FF0000]"
                      href="https://www.youtube.com/@ToolsMarket-dz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaYoutube />
                    </a>
                  </div>
                </div>
                <div className="flex justify-center flex-grow gap-8 ">
                  <RouterLink className="link linkColor" to="/">
                    {modifiedDataNav.map((el) => el.ItemOne)}
                  </RouterLink>
                  <RouterLink className="link linkColor" to="/Produits">
                    {modifiedDataNav.map((el) => el.ItemTwo)}
                  </RouterLink>
                  <RouterLink className="link linkColor" to="/A-Propos-de-Nous">
                    {modifiedDataNav.map((el) => el.ItemThree)}
                  </RouterLink>
                  <RouterLink className="link linkColor" to="/Contactez-Nous">
                    {modifiedDataNav.map((el) => el.ItemFour)}
                  </RouterLink>
                  <RouterLink
                    className="link linkColor"
                    to="/Politique-de-confidentialité"
                  >
                    {modifiedDataNav.map((el) => el.ItemFive)}
                  </RouterLink>
                </div>

                <div className="flex items-center justify-end flex-shrink-0 space-x-4">
                  <div className="relative z-50 bg-white">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center text-gray-800 focus:outline-none"
                    >
                      {userInfo ? <span>{userInfo.username}</span> : <></>}
                      {userInfo && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ml-1 ${
                            dropdownOpen ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                              dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"
                            }
                          />
                        </svg>
                      )}
                    </button>

                    {dropdownOpen && userInfo && (
                      <ul
                        className={`absolute ltr:right-0 rtl:md:-right-40 py-4 mt-2 mr-14 w-48 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-500 ${
                          !userInfo.isAdmin ? "top-8" : "top-8"
                        }`}
                      >
                        {userInfo.isAdmin && (
                          <>
                            <li>
                              <Link
                                onClick={toggleDropdown}
                                to="/Admin/Dashboard"
                                className="block px-4 py-2 text-sm font-medium text-pink-600 transition-colors duration-200 bg-pink-100 rounded-md hover:bg-pink-200 hover:text-pink-800"
                              >
                                🚀 {t("nav_bar_dashboard")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={toggleDropdown}
                                to="/Admin/Liste-des-produits"
                                className="block px-4 py-2 text-sm font-medium text-purple-600 transition-colors duration-200 bg-purple-100 rounded-md hover:bg-purple-200 hover:text-purple-800"
                              >
                                🛍️ {t("nav_bar_products")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={toggleDropdown}
                                to="/Admin/Liste-des-catégories"
                                className="block px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 bg-blue-100 rounded-md hover:bg-blue-200 hover:text-blue-800"
                              >
                                🗂️ {t("nav_bar_category")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={toggleDropdown}
                                to="/Admin/Liste-des-commandes"
                                className="block px-4 py-2 text-sm font-medium text-yellow-600 transition-colors duration-200 bg-yellow-100 rounded-md hover:bg-yellow-200 hover:text-yellow-800"
                              >
                                📦 {t("nav_bar_orders")}
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={toggleDropdown}
                                to="/Admin/Liste-des-utilisateurs"
                                className="block px-4 py-2 text-sm font-medium text-green-600 transition-colors duration-200 bg-green-100 rounded-md hover:bg-green-200 hover:text-green-800"
                              >
                                👥 {t("nav_bar_users")}
                              </Link>
                            </li>
                          </>
                        )}

                        <li>
                          <Link
                            onClick={toggleDropdown}
                            to="/Profile"
                            className="block px-4 py-2 text-sm font-medium text-indigo-600 transition-colors duration-200 bg-indigo-100 rounded-md hover:bg-indigo-200 hover:text-indigo-800"
                          >
                            👤 {t("nav_bar_profile")}
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logoutHandler}
                            className="block px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 bg-red-100 rounded-md hover:bg-red-200 hover:text-red-800"
                          >
                            🔓 {t("nav_bar_logout")}
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="flex">
                    <span className="text-2xl cursor-pointer">
                      <TranslateIcon />
                    </span>
                  </div>
                  {userInfo ? (
                    <></>
                  ) : (
                    <>
                      <Link to="/Panier">
                        <div className="cursor-pointer">
                          <Cart />
                        </div>
                      </Link>

                      <Link to="/Préféré">
                        <span className="text-2xl cursor-pointer">
                          <MdFavoriteBorder />
                          <FavoritesCount />
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white">
          <div className="container flex flex-row-reverse items-center justify-between lg:hidden">
            <div className={nav ? "visible lg:invisible" : "invisible"}>
              <img src={Logo} className="h-8" alt="Logo" />
            </div>
            <div>
              <div className="lg:hidden">
                <div className="cursor-pointer text-mainColor">
                  {nav ? (
                    <AiOutlineMenu className="w-6 h-6" onClick={navHandler} />
                  ) : (
                    <FaXmark className="w-6 h-6" onClick={navHandler} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className={
                nav
                  ? "absolute w-full rtl:left-[150%] h-[50rem] opacity-0 ltr:left-[-150%] duration-500 z-50"
                  : "absolute w-full left-0 bg-white h-[50rem] opacity-100 shadow-2xl z-50 duration-500"
              }
            >
              <div className="container flex flex-col py-12 gap-y-8">
                <RouterLink onClick={navHandler} className="linkColor" to="/">
                  {modifiedDataNav.map((el) => el.ItemOne)}
                </RouterLink>
                <RouterLink
                  onClick={navHandler}
                  className="linkColor"
                  to="/Produits"
                >
                  {modifiedDataNav.map((el) => el.ItemTwo)}
                </RouterLink>
                <RouterLink
                  onClick={navHandler}
                  className="linkColor"
                  to="/A-Propos-de-Nous"
                >
                  {modifiedDataNav.map((el) => el.ItemThree)}
                </RouterLink>
                <RouterLink
                  onClick={navHandler}
                  className="linkColor"
                  to="/Contactez-Nous"
                >
                  {modifiedDataNav.map((el) => el.ItemFour)}
                </RouterLink>

                <RouterLink
                  onClick={navHandler}
                  className="linkColor"
                  to="/Politique-de-confidentialité"
                >
                  {modifiedDataNav.map((el) => el.ItemFive)}
                </RouterLink>
              </div>

              <div className="container flex flex-row justify-between rtl:flex-row-reverse">
                <div className="mt-2 lg:hidden">
                  <img
                    className={nav ? "invisible w-40" : "visible w-40"}
                    src={Logo}
                    alt="Logo"
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div>
                    <TranslateIcon />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="container">
                  <div className="flex items-center justify-between">
                    <div className="relative z-50 bg-white">
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center text-gray-800 focus:outline-none"
                      >
                        {userInfo ? <span>{userInfo.username}</span> : <></>}
                        {userInfo ? (
                          <>
                            {/* Show SVG if userInfo is available */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ml-1 ${
                                dropdownOpen ? "transform rotate-180" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="black"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                  dropdownOpen
                                    ? "M5 15l7-7 7 7"
                                    : "M19 9l-7 7-7-7"
                                }
                              />
                            </svg>
                          </>
                        ) : (
                          // Show cart and favorites if userInfo is not available
                          <div className="container flex flex-row justify-between !p-0 rtl:flex-row-reverse">
                            <Link to="/Panier">
                              <div className="cursor-pointer">
                                <Cart />
                              </div>
                            </Link>

                            <div>
                              <div>
                                <Link to="/Préféré">
                                  <span className="text-2xl cursor-pointer">
                                    <MdFavoriteBorder />
                                    <FavoritesCount />
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </button>

                      {dropdownOpen && userInfo && (
                        <ul
                          className={`absolute md:-right-28 py-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#777] ${
                            !userInfo.isAdmin ? "top-8" : "top-8"
                          }`}
                        >
                          {userInfo.isAdmin && (
                            <>
                              <li>
                                <Link
                                  onClick={navHandler}
                                  to="/Admin/Dashboard"
                                  className="block px-4 py-2 text-sm font-medium transition-colors duration-200 bg-pink-100 rounded-md hover:bg-pink-200 hover:text-pink-800"
                                >
                                  🚀 Dashboard
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={navHandler}
                                  to="/Admin/Liste-des-produits"
                                  className="block px-4 py-2 text-sm font-medium transition-colors duration-200 bg-purple-100 rounded-md hover:bg-purple-200 hover:text-purple-800"
                                >
                                  🛍️ Products
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={navHandler}
                                  to="/Admin/Liste-des-catégories"
                                  className="block px-4 py-2 text-sm font-medium transition-colors duration-200 bg-blue-100 rounded-md hover:bg-blue-200 hover:text-blue-800"
                                >
                                  🗂️ Category
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={navHandler}
                                  to="/Admin/Liste-des-commandes"
                                  className="block px-4 py-2 text-sm font-medium transition-colors duration-200 bg-yellow-100 rounded-md hover:bg-yellow-200 hover:text-yellow-800"
                                >
                                  📦 Orders
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={navHandler}
                                  to="/Admin/Liste-des-utilisateurs"
                                  className="block px-4 py-2 text-sm font-medium transition-colors duration-200 bg-green-100 rounded-md hover:bg-green-200 hover:text-green-800"
                                >
                                  👥 Users
                                </Link>
                              </li>
                            </>
                          )}

                          <li>
                            <Link
                              onClick={navHandler}
                              to="/Profile"
                              className="block px-4 py-2 text-sm font-medium transition-colors duration-200 bg-indigo-100 rounded-md hover:bg-indigo-200 hover:text-indigo-800"
                            >
                              👤 Profile
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={logoutHandler}
                              className="block w-full px-4 py-2 text-sm font-medium text-left text-red-600 transition-colors duration-200 bg-red-100 rounded-md hover:bg-red-200 hover:text-red-800"
                            >
                              🔓 Logout
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
