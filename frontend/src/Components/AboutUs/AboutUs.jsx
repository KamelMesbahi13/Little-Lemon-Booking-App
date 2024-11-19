import { lazy } from "react";
const Introduction = lazy(() => import("./Introduction/Introduction"));
const OurStory = lazy(() => import("./OurStory/OurStory"));
const WhoAreWe = lazy(() => import("./WhoAreWe/WhoAreWe"));
const WeAreTheBest = lazy(() => import("./WeAreTheBest/WeAreTheBest"));
const OurProductAboutUs = lazy(() =>
  import("./OurProductAboutUs/OurProductAboutUs")
);

const AboutUs = () => {
  return (
    <div>
      <Introduction />
      <div className="container">
        <OurStory />
        <WhoAreWe />
      </div>
      <WeAreTheBest />
      <div className="container">
        <OurProductAboutUs />
      </div>
    </div>
  );
};

export default AboutUs;
