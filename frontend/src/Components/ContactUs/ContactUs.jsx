import { lazy } from "react";
const Introduction = lazy(() => import("./Introduction/Introduction"));
const ContactForm = lazy(() => import("./ContactForm/ContactForm"));

const ContactUs = () => {
  return (
    <div>
      <Introduction />
      <ContactForm />
    </div>
  );
};

export default ContactUs;
