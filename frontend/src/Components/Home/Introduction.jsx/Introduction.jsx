import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Introduction = () => {
  const navigate = useNavigate();

  const ToShopHandler = () => {
    navigate("/Produits");
    window.scrollTo(0, 0);
  };

  const { t } = useTranslation();

  return (
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
      <div className="relative HomeBack">
        <div className="container">
          <div className="absolute -translate-y-1/2 top-1/2">
            <div>
              <div className="w-3/4">
                <h1>{t("introduction_header")}</h1>
              </div>
              <div>
                <button className="button" onClick={ToShopHandler}>
                  {t("buy_button")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Introduction;
