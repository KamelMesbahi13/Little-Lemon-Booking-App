import PropTypes from "prop-types";

const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-[#53a653] text-green-[#4BB543]";
      case "error":
        return "bg-red-[#ff4545] text-red-[#ff0f0f]";
      default:
        return "bg-blue-[#2986cc] text-blue-[#206ba3]";
    }
  };

  return <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>;
};

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Message;
