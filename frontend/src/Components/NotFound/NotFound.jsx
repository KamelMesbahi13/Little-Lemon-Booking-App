import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-40">
      <h1 className="text-3xl font-bold text-[#0a6bff] mb-4">
        {t("title_not_found")}
      </h1>
      <p className="px-6 mb-6 text-center">{t("message_not_found")}</p>
      <Link to="/" className="button">
        {t("button_not_found")}
      </Link>
    </div>
  );
};

export default NotFound;
