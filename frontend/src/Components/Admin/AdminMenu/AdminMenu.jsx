import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaCog } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AdminMenu = () => {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-11 right-6" : "top-11 right-6"
        } bg-mainColor p-1 fixed rounded-md z-50 md:p-2`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" size={20} />
        ) : (
          <FaCog color="white" size={20} />
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-white p-4 fixed right-16 top-12 w-[250px] md:w-[300px] h-auto z-[100] shadow-lg rounded-lg">
          <ul className="mt-4 space-y-4 list-none">
            {[
              { name: `${t("admin_dashboard")}`, to: "/Admin/dashboard" },
              {
                name: `${t("create_category")}`,
                to: "/Admin/Liste-des-catégories",
              },
              {
                name: `${t("create_product")}`,
                to: "/Admin/Liste-des-produits",
              },
              { name: `${t("all_products")}`, to: "/Admin/Tous-les-produits" },
              {
                name: `${t("manage_users")}`,
                to: "/Admin/Liste-des-utilisateurs",
              },
              {
                name: `${t("manage_orders")}`,
                to: "/Admin/Liste-des-commandes",
              },
            ].map((link, index) => (
              <li key={index}>
                <NavLink
                  className="block py-3 px-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0a6bff] hover:via-[#065dd8] hover:to-[#0a6bff] shadow-md hover:shadow-lg"
                  to={link.to}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#065dd8" : "#eee",
                    color: isActive ? "#f0f0f0f0" : "#333",
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
