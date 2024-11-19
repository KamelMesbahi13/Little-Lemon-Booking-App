import { lazy } from "react";
import NewProducts from "../NewProducts/NewProducts";
const Introduction = lazy(() => import("./Introduction.jsx/Introduction"));
const HomeAboutUs = lazy(() => import("./HomeAboutUs/HomeAboutUs"));
const Advantages = lazy(() => import("./Advantages/Advantages"));
const TopSells = lazy(() => import("./TopSells/TopSells"));
const BeforeSales = lazy(() => import("./BeforeSales/BeforeSales"));
const HomeContactUs = lazy(() => import("./HomeContactUs/HomeContactUs"));

const Home = () => {
  return (
    <div>
      <NewProducts />
      <Introduction />
      <HomeAboutUs />
      <Advantages />
      <TopSells />
      <BeforeSales />
      <HomeContactUs />
    </div>
  );
};

export default Home;
