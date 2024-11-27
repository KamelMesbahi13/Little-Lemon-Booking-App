import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import Data from "../../../Data/Data.json";
import Logo from "../../../assets/Logo.jpg";
import { BiLogoGmail } from "react-icons/bi";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { i18n } = useTranslation();
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const modifiedDataNav = Data.navbarItems.map((data) => {
    if (i18n.language === "ar") {
      return {
        id: data.id,
        ItemOne: data.ItemOne_ar,
        ItemTwo: data.ItemTwo_ar,
        ItemThree: data.ItemThree_ar,
        ItemFour: data.ItemFour_ar,
      };
    }

    if (i18n.language === "fr") {
      return {
        id: data.id,
        ItemOne: data.ItemOne_fr,
        ItemTwo: data.ItemTwo_fr,
        ItemThree: data.ItemThree_fr,
        ItemFour: data.ItemFour_fr,
      };
    }
    return data;
  });

  const handleLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="w-full bg-white border-t-2">
        <div className="container pb-4 md:pb-8 ">
          <div className="flex flex-col pt-12 md:pt-28 md:flex-row">
            <div className="pb-8 border-b-4 border-secondColor md:pb-0 md:border-b-0 md:w-1/4">
              <h1 className="mb-4 md:mb-8">{t("footer_contact_us_header")}</h1>
              <p>{t("footer_contact_us_paragraph")}</p>
              <div className="flex items-center my-4 initialDirection">
                <i className="mr-3 text-xl text-mainColor">
                  <FaPhoneAlt />
                </i>
                <p className="italic font-bold">0797 60 33 66</p>
              </div>
              <div className="flex items-center initialDirection">
                <i className="mr-3 text-2xl text-mainColor">
                  <BiLogoGmail />
                </i>
                <p className="italic font-bold">
                  tools.market.algeria@gmail.com
                </p>
              </div>
            </div>
            <div className="pb-8 border-b-4 border-secondColor md:w-1/2 md:text-center md:pb-0 md:border-b-0">
              <h1 className="mt-8 mb-4 md:mb-8 md:mt-0">{t("footer_links")}</h1>
              <div className="flex flex-row gap-8 md:flex-col">
                <RouterLink to="/" onClick={handleLinkClick}>
                  {modifiedDataNav.map((el) => el.ItemOne)}
                </RouterLink>
                <RouterLink to="/Produits" onClick={handleLinkClick}>
                  {modifiedDataNav.map((el) => el.ItemTwo)}
                </RouterLink>
                <RouterLink to="/A-Propos-de-Nous" onClick={handleLinkClick}>
                  {modifiedDataNav.map((el) => el.ItemThree)}
                </RouterLink>
                <RouterLink to="/Contactez-Nous" onClick={handleLinkClick}>
                  {modifiedDataNav.map((el) => el.ItemFour)}
                </RouterLink>
              </div>
            </div>
            <div className="pb-8 mt-8 border-b-4 border-secondColor md:w-1/4 md:mt-0 md:pb-0 md:border-b-0">
              <h1>{t("footer_social_media_header")}</h1>
              <p className="my-4 md:my-8">
                {t("footer_social_media_paragraph")}
              </p>
              <div className="flex justify-between w-1/2 text-2xl">
                <a
                  href="https://www.instagram.com/toolsmarket.dz/"
                  target="_blank"
                >
                  <i className="text-2xl text-[#E1306C]">
                    <FaInstagram />
                  </i>
                </a>

                <a
                  href="https://www.facebook.com/Toolsmarketdz"
                  target="_blank"
                >
                  <i className="text-2xl text-[#1877F2]">
                    <FaFacebook />
                  </i>
                </a>

                <a href="https://www.tiktok.com/@toolsmarketdz" target="_blank">
                  <i className="text-2xl">
                    <FaTiktok />
                  </i>
                </a>

                <a
                  href="https://www.youtube.com/@ToolsMarket-dz"
                  target="_blank"
                >
                  <i className="text-2xl text-[#FF0000]">
                    <FaYoutube />
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div className="md:mt-24 mt-14 textCenter">
            <img className="w-80" src={Logo} alt="" />
          </div>
          <div>
            <div className="w-full h-2 mt-8 bg-mainColor"></div>
          </div>
          <div className="textRight">
            <p className="mt-4 italic font-bold">
              {t("content_Copyright")} &#169; {year} {t("content")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
