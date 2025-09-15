import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import NotFound from "./Components/NotFound/NotFound";
const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Home = lazy(() => import("./Components/Home/Home"));
const Loader = lazy(() => import("./Components/Ui/Loader/Loader"));
const Footer = lazy(() => import("./Components/Ui/Footer/Footer"));
const Up = lazy(() => import("./Components/Ui/Up/Up"));
const AboutUs = lazy(() => import("./Components/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("./Components/ContactUs/ContactUs"));
const Login = lazy(() => import("./Components/Auth/Login"));
const Register = lazy(() => import("./Components/Auth/Register"));

const PrivateRoute = lazy(() =>
  import("./Components/PrivateRoute/PrivateRoute")
);
const Profile = lazy(() => import("./User/Profile/Profile"));
const AdminRoute = lazy(() =>
  import("./Components/Admin/AdminRoute/AdminRoute")
);
const UserList = lazy(() => import("./Components/Admin/UserList/UserList"));
const CategoryList = lazy(() =>
  import("./Components/Admin/CategoryList/CategoryList")
);
const ProductList = lazy(() =>
  import("./Components/Admin/ProductList/ProductList")
);
const ProductUpdate = lazy(() =>
  import("./Components/Admin/ProductUpdate/ProductUpdate")
);
const AllProducts = lazy(() =>
  import("./Components/Admin/AllTheProducts/AllTheProducts")
);
const Favorites = lazy(() =>
  import("./Components/Products/Favorites/Favorites")
);
const ProductDetails = lazy(() =>
  import("./Components/Products/ProductsDetails/ProductsDetails")
);
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Shop = lazy(() => import("./Components/Shop/Shop"));
const Shipping = lazy(() => import("./Components/Orders/Shipping/Shipping"));
const PlaceOrder = lazy(() =>
  import("./Components/Orders/PlaceOrders/PlaceOrders")
);
const Order = lazy(() => import("./Components/Orders/Order/Order"));
const UserOrder = lazy(() => import("./User/UserOrder/UserOrder"));
const OrderSuccess = lazy(() =>
  import("./Components/Orders/OrderSuccess/OrderSuccess")
);
const AdminDashboard = lazy(() =>
  import("./Components/Admin/AdminDashboard/AdminDashboard")
);
const NewestProducts = lazy(() =>
  import("./Components/Products/NewestProducts/NewestProducts")
);

const App = () => {
  const location = useLocation();

  // Trigger PageView event on route changes
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location]);

  const pathsWithFooter = [
    "/",
    "/A-Propos-de-Nous",
    "/Contactez-Nous",
    "/Produits",
    "/Produit/:id",
  ];

  const showFooter = pathsWithFooter.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith("/Produit/")
  );

  return (
    <>
      <Suspense
        fallback={
          <div className="mt-20 textCenter">
            <Loader />
          </div>
        }
      >
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="" element={<PrivateRoute />}>
              <Route path="/Profile" element={<Profile />} />
            </Route>
            <Route path="/A-Propos-de-Nous" element={<AboutUs />} />
            <Route path="/Contactez-Nous" element={<ContactUs />} />
            <Route path="/Produits" element={<Shop />} />
            <Route path="/Produit/:id" element={<ProductDetails />} />
            <Route path="/Panier" element={<Cart />} />
            <Route path="/Livraison" element={<Shipping />} />
            <Route path="/Passer-commande" element={<PlaceOrder />} />
            <Route path="/Succès-de-la-commande" element={<OrderSuccess />} />
            <Route path="/Commande/:id" element={<Order />} />
            <Route path="/S3cure-c0nn3ct10n_4d71f9" element={<Login />} />
            <Route path="/Inscrire" element={<Register />} />
            <Route path="/Préféré" element={<Favorites />} />
            <Route path="/Nouveau-produit" element={<NewestProducts />} />
            <Route path="/*" element={<NotFound />} />

            <Route
              path="/Politique-de-confidentialité"
              element={<PrivacyPolicy />}
            />
            <Route path="/Admin" element={<AdminRoute />}>
              <Route path="Liste-des-utilisateurs" element={<UserList />} />
              <Route path="Liste-des-commandes" element={<UserOrder />} />
              <Route path="Liste-des-catégories" element={<CategoryList />} />
              <Route path="Liste-des-produits" element={<ProductList />} />
              <Route path="Tous-les-produits" element={<AllProducts />} />
              <Route
                path="produit/modification/:id"
                element={<ProductUpdate />}
              />
              <Route path="Dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
          <Up />
          {showFooter && <Footer />}
        </div>
      </Suspense>
    </>
  );
};

export default App;
