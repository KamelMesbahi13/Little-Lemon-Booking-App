import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const OurStory = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="mt-8"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:ltr:mr-8 lg:rtl:ml-8">
              <p>{t("our_story_paragraph_one")}</p>
            </div>
            <div className="mt-8 lg:ltr:ml-8 lg:rtl:mr-8 lg:mt-0">
              <p>{t("our_story_paragraph_two")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurStory;
