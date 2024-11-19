import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../../Components/Ui/Message/Message";
import Loader from "../../../Components/Ui/Loader/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../Redux/Api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "../AdminMenu/AdminMenu";
import { useTranslation } from "react-i18next";

const UserList = () => {
  const { t } = useTranslation();

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm(`${t("are_u_sure")}`)) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        error(err?.data?.message || err.error || t("error_occurred"));
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error || t("error_occurred"));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="container">
        <h1 className="my-4 md:my-16">{t("users_header")}</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="flex flex-col md:flex-row">
            <AdminMenu />
            <div className="w-full overflow-x-auto">
              <table className="min-w-full overflow-hidden border-collapse rounded-lg shadow-lg table-auto">
                <thead className="text-white bg-secondColor">
                  <tr>
                    <th className="px-4 py-2 ltr:text-left rtl:text-right">
                      {t("table_id")}
                    </th>
                    <th className="px-4 py-2 ltr:text-left rtl:text-right">
                      {t("table_name")}
                    </th>
                    <th className="px-4 py-2 ltr:text-left rtl:text-right">
                      {t("table_email")}
                    </th>
                    <th className="px-4 py-2 ltr:text-left rtl:text-right">
                      {t("table_admin")}
                    </th>
                    <th className="px-4 py-2 ltr:text-left rtl:text-right"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#eee]">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{user._id}</td>
                      <td className="px-4 py-2">
                        {editableUserId === user._id ? (
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) =>
                                setEditableUserName(e.target.value)
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-mainColor"
                              placeholder="Username"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="mt-2 text-white transition duration-150 ease-in-out button sm:mt-0 sm:ml-2 bg-mainColor hover:bg-secondColor"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            {user.username}
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                              className="ml-4 transition duration-150 ease-in-out text-mainColor hover:text-secondColor"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editableUserId === user._id ? (
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <input
                              type="text"
                              value={editableUserEmail}
                              onChange={(e) =>
                                setEditableUserEmail(e.target.value)
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-mainColor"
                              placeholder="Email"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="px-4 py-2 mt-2 text-white transition duration-150 ease-in-out button sm:mt-0 sm:ml-2 bg-mainColor hover:bg-secondColor"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <a
                              href={`mailto:${user.email}`}
                              className="text-blue-500 hover:underline"
                            >
                              {user.email}
                            </a>
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                              className="ml-4 transition duration-150 ease-in-out text-mainColor hover:text-secondColor"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {user.isAdmin ? (
                          <FaCheck className="text-[#4BB543]" />
                        ) : (
                          <FaTimes className="text-red" />
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {!user.isAdmin && (
                          <div className="flex">
                            <button
                              onClick={() => deleteHandler(user._id)}
                              className="text-white transition duration-150 ease-in-out !bg-red button hover:bg-red"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
