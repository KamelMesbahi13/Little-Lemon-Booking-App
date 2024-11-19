import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Introduction = () => {
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
      <div className="relative ContactUsBack">
        <div className="container">
          <div className="absolute -translate-y-1/2 top-1/2">
            <div>
              <div>
                <h1>{t("contact_us_header")}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Introduction;
