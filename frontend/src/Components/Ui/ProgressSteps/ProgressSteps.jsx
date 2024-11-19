import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ProgressSteps = ({ step2 = false, step3 = false }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center py-6 mt-6 space-x-6 md:space-x-10">
      <div className="flex items-center">
        <div className="flex flex-col items-center ml-4">
          <span
            className={`${
              step2 ? "text-mainColor" : "text-gray-300"
            } text-lg font-semibold`}
          >
            {t("shipping_header")}
          </span>
          <div
            className={`mt-2 text-lg ${
              step2 ? "text-mainColor" : "text-gray-300"
            }`}
          >
            {step2 ? "✅" : "⬤"}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        {step2 && step3 && (
          <div className="w-16 h-1 md:w-24 bg-mainColor"></div>
        )}
        <div className="flex flex-col items-center ml-4">
          <span
            className={`${
              step3 ? "text-mainColor" : "text-gray-300"
            } text-lg font-semibold`}
          >
            {t("summary")}
          </span>
          <div
            className={`mt-2 text-lg ${
              step3 ? "text-mainColor" : "text-gray-300"
            }`}
          >
            {step3 ? "✅" : "⬤"}
          </div>
        </div>
      </div>
    </div>
  );
};

ProgressSteps.propTypes = {
  step2: PropTypes.bool,
  step3: PropTypes.bool,
};

export default ProgressSteps;
