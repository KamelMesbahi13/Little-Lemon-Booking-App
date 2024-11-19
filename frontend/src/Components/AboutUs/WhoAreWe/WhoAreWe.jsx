import Img from "../../../assets/OurStory.jpg";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const WhoAreWe = () => {
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
        <div className="mt-16 md:mt-28">
          <div className="flex flex-col items-center md:flex-row">
            <div>
              <div className="ltr:pr-8 rtl:pl-8">
                <div>
                  <h1>{t("who_are_we_header")}</h1>
                </div>
                <div>
                  <p>{t("who_are_we_paragraph")}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <img src={Img} alt="Our Story Image" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WhoAreWe;
