import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../../Redux/Api/categoryApiSlice";
import CategoryForm from "../../../Components/Ui/CategoryForm/CategoryForm";
import Modal from "../../../Components/Ui/Modal/Modal";
import AdminMenu from "../AdminMenu/AdminMenu";
import { useTranslation } from "react-i18next";
import Loader from "../../Ui/Loader/Loader";

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
      console.error(t("toast_name_required")); // Log the error
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      console.log(`${t("toast_created", { name: result.name })}`);
      setName("");
      refetch();
    } catch (error) {
      console.error(t("toast_creation_failed"), error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName || !selectedCategory) {
      console.error(t("toast_category_name_selected"));
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      console.log(`${t("toast_updated", { name: result.name })}`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch();
    } catch (error) {
      console.error(t("toast_update_failed"), error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
      console.error(t("toast_category_required"));
      return;
    }

    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      console.log(`${t("toast_deleted", { name: result.name })}`);
      setSelectedCategory(null);
      setModalVisible(false);
      refetch();
    } catch (error) {
      console.error(t("toast_deletion_failed"), error);
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
