import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../../Redux/Api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../../Components/Ui/CategoryForm/CategoryForm";
import Modal from "../../../Components/Ui/Modal/Modal";
import AdminMenu from "../AdminMenu/AdminMenu";
import { useTranslation } from "react-i18next";
import Loader from "../../Ui/Loader/Loader";
import i18next from "i18next";

const CategoryList = () => {
  const { t } = useTranslation();

  const {
    data: categories = [],
    refetch,
    isLoading,
  } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error(`${t("toast_name_required")}`);
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();

      const currentLang = i18next.language;

      if (currentLang === "en") {
        toast.success(`${result.name} is created.`);
      } else if (currentLang === "ar") {
        toast.success(`${result.name} تم انشائه.`);
      } else if (currentLang === "fr") {
        toast.success(`${result.name} est créé.`);
      }

      setName("");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName || !selectedCategory) {
      toast.error(`${t("category_name_selected")}`);
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();

      // Get the current language
      const currentLang = i18next.language;

      // Show a toast message based on the language
      if (currentLang === "en") {
        toast.success(`${result.name} is updated`);
      } else if (currentLang === "ar") {
        toast.success(`${result.name} تم تحديثه`);
      } else if (currentLang === "fr") {
        toast.success(`${result.name} est actualisé`);
      }

      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch(); // Refresh the category list after update
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
      toast.error(`${t("toast_category_required")}`);
      return;
    }

    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      // Get the current language
      const currentLang = i18next.language;

      // Show a toast message based on the language
      if (currentLang === "en") {
        toast.success(`${result.name} is deleted.`);
      } else if (currentLang === "ar") {
        toast.success(`${result.name} تم حذفه.`);
      } else if (currentLang === "fr") {
        toast.success(`${result.name} est supprimé.`);
      }

      setSelectedCategory(null);
      setModalVisible(false);
      refetch(); // Refresh the category list after deletion
    } catch (error) {
      console.error(error);
      toast.error(`${t("category_deletion")}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="container">
        <AdminMenu className="w-full md:w-1/4" />
        <div className="w-full md:w-3/4">
          <div className="my-8 md:my-16">
            <h1>{t("category_list_header")}</h1>
          </div>
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
          <br />
          <hr />

          <div className="flex flex-wrap mt-4">
            {isLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              categories.map((category) => (
                <div key={category._id} className="m-3">
                  <button
                    className="button"
                    onClick={() => {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }}
                  >
                    {category.name}
                  </button>
                </div>
              ))
            )}
          </div>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdateCategory}
              buttonText="Update"
              handleDelete={handleDeleteCategory}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
