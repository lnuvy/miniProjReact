import React from "react";
import {
  FaChair,
  FaDesktop,
  FaHospitalSymbol,
  FaRegCommentDots,
  FaPen,
} from "react-icons/fa";

const CategoryIconSwitch = (props) => {
  const { category } = props;

  const chooseIcon = (category) => {
    switch (category) {
      case "chair":
        return <FaChair />;
      case "desk":
        return <FaDesktop />;
      case "healthCare":
        return <FaHospitalSymbol />;
      case "etc":
        return <FaRegCommentDots />;
      default:
        return <FaPen />;
    }
  };

  return <>{chooseIcon(category)}</>;
};

export default CategoryIconSwitch;
