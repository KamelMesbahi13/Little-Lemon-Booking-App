import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const CategoryForm = ({ value, setValue, handleSubmit, handleDelete }) => {
  const { t } = useTranslation();

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="w-full px-4 py-3 border rounded-lg"
          placeholder={`${t("category_list_write_category_name")}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="button">{t("send_button")}</button>

          {handleDelete && (
            <button onClick={handleDelete} className="button !bg-red">
              {t("delete_button")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

CategoryForm.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  handleDelete: PropTypes.func,
};

export default CategoryForm;
