import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BiSupport } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiWallet } from "react-icons/bi";
import { GrDeliver } from "react-icons/gr";

const Boxes = [
  {
    id: 1,
    icon: <GrDeliver />,
    title: "Fast and Reliable Shipping",
    title_fr: "Livraison rapide et fiable",
    title_ar: "شحن سريع وموثوق",
    description:
      "Quick, dependable shipping to ensure your tools arrive on time.",
    description_fr:
      "Une livraison rapide et fiable pour garantir que vos outils arrivent à temps.",
    description_ar: "توصيل سريع وموثوق به لضمان وصول أدواتك في الوقت المحدد.",
  },

  {
    id: 2,
    icon: <BiSupport />,
    title: "Expert Customer Support",
    title_fr: "Assistance à la clientèle experte",
    title_ar: "دعم العملاء الخبراء",
    description:
      "Friendly, expert support ready to assist with any questions or issues.",
    description_fr:
      "Une assistance amicale et experte prête à répondre à toutes les questions et à tous les problèmes.",
    description_ar:
      "دعم الخبراء الودودين والخبراء الجاهزين لمساعدتك في أي أسئلة أو مشاكل.",
  },

  {
    id: 3,
    icon: <BiWallet />,
    title: "Competitive Pricing",
    title_fr: "Prix compétitifs",
    title_ar: "أسعار تنافسية",
    description:
      "Top-quality tools at unbeatable prices, ensuring great value for your money.",
    description_fr:
      "Des outils de qualité supérieure à des prix imbattables, pour un excellent rapport qualité-prix.",
    description_ar:
      "أدوات عالية الجودة بأسعار لا تقبل المنافسة، مما يضمن لك قيمة كبيرة مقابل نقودك.",
  },

  {
    id: 4,
    icon: <FaRegCheckCircle />,
    title: "High-Quality Tools",
    title_fr: "Outils de haute qualité",
    title_ar: "أدوات عالية الجودة",
    description:
      "Premium tools from trusted manufacturers, built for durability and performance.",
    description_fr:
      "Des outils haut de gamme de fabricants de confiance, conçus pour durer et être performants.",
    description_ar:
      "أدوات ممتازة من شركات تصنيع موثوق بها، مصممة لضمان المتانة والأداء.",
  },
];

const WeAreTheBest = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const modifiedData = Boxes.map((data) => {
    if (i18n.language === "ar") {
      return {
        id: data.id,
        icon: data.icon,
        title: data.title_ar,
        description: data.description_ar,
      };
    }

    if (i18n.language === "fr") {
      return {
        id: data.id,
        icon: data.icon,
        title: data.title_fr,
        description: data.description_fr,
      };
    }
    return data;
  });

  return (
    <div className="TextureBack">
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
        <div className="mt-16 md:mt-20">
          <div className="container py-8 md:py-16">
            <div>
              <div>
                <div>
                  <h1>{t("we_are_the_best_header")}</h1>
                </div>
                <div>
                  <p>{t("we_are_the_best_paragraph")}</p>
                </div>
              </div>
              <div className="flex justify-center mt-12 md:mt-20">
                <div className="grid items-center gap-6 md:grid-cols-2">
                  {modifiedData.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className="flex items-center">
                          <div>
                            <div>
                              <i className="text-xl text-mainColor md:text-2xl">
                                {item.icon}
                              </i>
                            </div>
                          </div>
                          <div className="ltr:ml-4 rtl:mr-4">
                            <h6>{item.title}</h6>
                            <p className="text-xs">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeAreTheBest;
