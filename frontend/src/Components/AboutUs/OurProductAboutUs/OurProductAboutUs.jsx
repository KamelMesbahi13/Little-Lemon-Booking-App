import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Img from "../../../assets/OurProductAboutUsOne.webp";
import { useNavigate } from "react-router-dom";

const OurProductAboutUs = () => {
  const navigate = useNavigate();

  const ToShopHandler = () => {
    navigate("/Boutique");
    window.scrollTo(0, 0);
  };
  const { t } = useTranslation();

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="my-12 md:my-28">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mt-8 md:mt-0">
              <img className="md:w-[200rem]" src={Img} alt="Our Story Image" />
            </div>
            <div>
              <div className="mt-8 md:ltr:pl-8 md:mt-0 md:rtl:pr-8">
                <div>
                  <h1>{t("our_product_about_us_header")}</h1>
                </div>
                <div>
                  <p>{t("our_product_about_us_paragraph")}</p>
                </div>
                <div className="mt-8">
                  <button className="button" onClick={ToShopHandler}>
                    {t("our_product_about_us_button")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OurProductAboutUs;
