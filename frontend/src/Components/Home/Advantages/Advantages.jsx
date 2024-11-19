import { useTranslation } from "react-i18next";
import { BiSupport } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiWallet } from "react-icons/bi";
import { GrDeliver } from "react-icons/gr";
import { motion } from "framer-motion";

const Boxes = [
  {
    id: 1,
    icon: <GrDeliver />,
    title: "Delivery In 24h",
    title_fr: "Livraison en 24h",
    title_ar: "التوصيل خلال 24 ساعة",
    description: "Delivery 58 states",
    description_fr: "Livraison 58 wilaya",
    description_ar: "توصيل 58 ولاية",
  },

  {
    id: 2,
    icon: <BiSupport />,
    title: "Support 24/7",
    title_fr: "Assistance 24/7",
    title_ar: "الدعم 24/7",
    description: "Shop with an expert",
    description_fr: "Acheter avec un expert",
    description_ar: "تسوق مع خبير",
  },

  {
    id: 3,
    icon: <BiWallet />,
    title: "Save your money",
    title_fr: "Économisez votre argent",
    title_ar: "وفّر أموالك",
    description: "The best prices in the market",
    description_fr: "Les meilleurs prix du marché",
    description_ar: "أفضل الأسعار في السوق",
  },

  {
    id: 4,
    icon: <FaRegCheckCircle />,
    title: "Quality guarantee",
    title_fr: "Garantie de qualité",
    title_ar: "ضمان الجودة",
    description: "Quality checked by our team",
    description_fr: "Qualité contrôlée par notre équipe",
    description_ar: "فحص الجودة من قِبل فريقنا",
  },
];

const Advantages = () => {
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
    <div className="bg-[#eee] w-full">
      <div className="container">
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:place-items-center">
            {modifiedData.map((item) => {
              return (
                <div key={item.id}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    <div className="flex items-center">
                      <div>
                        <div>
                          <i className="text-xl md:text-2xl">{item.icon}</i>
                        </div>
                      </div>
                      <div className="ltr:ml-4 rtl:mr-4">
                        <h6>{item.title}</h6>
                        <p className="text-xs">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
