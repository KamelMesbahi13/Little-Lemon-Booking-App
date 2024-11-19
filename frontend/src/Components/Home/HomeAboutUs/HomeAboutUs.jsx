import { useTranslation } from "react-i18next";
import Img from "../../../assets/HomeAboutUsImg.webp";
import ImgSmall from "../../../assets/HomeAboutUsImgSmall.webp";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const HomeAboutUs = () => {
  const navigate = useNavigate();

  const ToAboutUSHandler = () => {
    navigate("/A-Propos-de-Nous");
    window.scrollTo(0, 0);
  };

  const { t } = useTranslation();

  return (
    <div>
      <div>
        <div>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="px-10 my-12 md:pl-20 md:my-0">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="w-full md:w-3/4"
              >
                <div>
                  <h1>{t("about_us_home_header")}</h1>
                </div>
                <div>
                  <h6>{t("about_us_home_subheader")}</h6>
                </div>
                <div className="my-4">
                  <p>{t("about_us_home_paragraph")}</p>
                </div>
                <div>
                  <button className="button" onClick={ToAboutUSHandler}>
                    {t("about_us_home_button")}
                  </button>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              <img
                className="hidden md:block"
                src={Img}
                alt="Home About Us Img"
              />
              <img
                className="block md:hidden"
                src={ImgSmall}
                alt="Home About Us Img"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAboutUs;
