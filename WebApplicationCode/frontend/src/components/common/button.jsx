import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button className="btn  btn-info" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
