import React from "react";
import { IoShareOutline } from "react-icons/io5";
import { FaShare } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import "./shareButton.css";

const ShareButton = ({ textColor, onClick }) => {
  return (
    <button
      onClick={onClick} // ✅ Use the passed onClick function
      className="shareButton"
      aria-label="Share"
    >
      <IoShareOutline className="share-icon" style={{ color: textColor }} />
    </button>
  );
};

export default ShareButton;
