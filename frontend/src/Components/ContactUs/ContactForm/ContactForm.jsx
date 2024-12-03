import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const Boxes = [
  {
    id: 1,
    icon: <CiLocationOn />,
    title: "Our Location",
    title_fr: "Notre localisation",
    title_ar: "موقعنا",
    paragraph: "164 Hai Ben Zerga Bordj El kiffen",
    paragraph_fr: "164 Hai Ben Zerga Bordj El kiffen",
    paragraph_ar: "164 حي بن زرقة ببرج الكيفان",
  },

  {
    id: 2,
    icon: <FaPhone />,
    title: "Phone Number",
    title_fr: "Numéro de téléphone",
    title_ar: "رقم الهاتف",
    paragraph: "0797 60 33 66",
    paragraph_fr: "0797 60 33 66",
    paragraph_ar: "0797 60 33 66",
  },

  {
    id: 3,
    icon: <MdOutlineMail />,
    title: "Our email",
    title_fr: "Notre email",
    title_ar: "بريدنا الإلكتروني",
    paragraph: "tools.market.algeria@gmail.com",
    paragraph_fr: "tools.market.algeria@gmail.com",
    paragraph_ar: "tools.market.algeria@gmail.com",
  },
];

const ContactForm = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  const inputStyles = `w-full mt-5 rounded-md text-backgroundColor focus:outline-none bg-[#eee] px-5 py-3`;

  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const modifiedData = Boxes.map((data) => {
    if (i18n.language === "ar") {
      return {
        id: data.id,
        icon: data.icon,
        title: data.title_ar,
        paragraph: data.paragraph_ar,
      };
    }

    if (i18n.language === "fr") {
      return {
        id: data.id,
        icon: data.icon,
        title: data.title_fr,
        paragraph: data.paragraph_fr,
      };
    }
    return data;
  });

  return (
    <div className="ContactUsBackTwo md:p-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="mt-8 md:mt-8">
          <div>
            <div className="shadow-xl">
              <div className="container">
                <div className="flex flex-col items-center md:flex-row">
                  <div className="py-8">
                    <div>
                      <div className="md:mr-8 md:rtl:ml-8">
                        <div>
                          <h1>{t("contact_form_header")}</h1>
                        </div>
                        <div>
                          <p>{t("contact_form_paragraph")}</p>
                        </div>
                      </div>
                      <div className="mt-8">
                        {modifiedData.map((item) => {
                          return (
                            <div key={item.id}>
                              <div className="flex items-center">
                                <div>
                                  <div className="my-6 mr-4 rtl:ml-4">
                                    <i className="text-2xl text-mainColor">
                                      {item.icon}
                                    </i>
                                  </div>
                                </div>
                                <div>
                                  <div>
                                    <h6>{item.title}</h6>
                                  </div>
                                  <div>
                                    <p className="initialDirection">
                                      {item.paragraph}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="pb-8">
                    <iframe
                      className="md:w-[550px] md:h-[500px]"
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3196.0282393659018!2d3.2385880000000005!3d36.769890000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDQ2JzExLjYiTiAzwrAxNCcxOC45IkU!5e0!3m2!1sen!2sdz!4v1732720961756!5m2!1sen!2sdz"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div className="textCenter">
                      <div className="relative px-8 pt-8 pb-4 mt-8 bg-white shadow-xl md:mt-40 md:mb-12 md:py-12 md:w-1/2">
                        <div>
                          <div>
                            <h1 className="mb-4">
                              {t("home_contact_us_section_header")}
                            </h1>
                            <p>{t("home_contact_us_section_paragraph")}</p>
                          </div>
                          <form
                            target="_blank"
                            className="mb-8 text-center md:mb-0"
                            onSubmit={onSubmit}
                            action="#"
                            method="POST"
                          >
                            <input
                              type="text"
                              placeholder={t("form_name")}
                              className={inputStyles}
                              {...register("name", {
                                required: true,
                                minLength: 3,
                                maxLength: 100,
                              })}
                            />
                            {errors.name && (
                              <p className="mt-1 text-mainColor">
                                {errors.name.type === "required" &&
                                  `${t("required")}`}
                                {errors.name.type === "maxLength" &&
                                  `${t("maxLengthOne")}`}
                                {errors.name &&
                                  errors.name.type === "minLength" &&
                                  `${t("minLengthOne")}`}
                              </p>
                            )}
                            <input
                              type="text"
                              placeholder={t("form_email")}
                              className={inputStyles}
                              {...register("email", {
                                required: true,
                                pattern:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              })}
                            />
                            {errors.email && (
                              <p className="mt-1 text-mainColor">
                                {errors.email.type === "required" &&
                                  `${t("required")}`}
                                {errors.email.type === "pattern" &&
                                  `${t("email")}`}
                              </p>
                            )}
                            <textarea
                              placeholder={t("form_message")}
                              className={inputStyles}
                              rows={4}
                              cols={50}
                              {...register("message", {
                                required: true,
                                minLength: 5,
                                maxLength: 2000,
                              })}
                            />
                            {errors.message && (
                              <p className="mt-1 text-mainColor">
                                {errors.message.type === "required" &&
                                  `${t("required")}`}
                              </p>
                            )}
                            <div className="mt-8">
                              <button className="button">
                                {t("send_button")}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
