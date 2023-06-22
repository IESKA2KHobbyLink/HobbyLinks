import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="md:w-[600px] w-[90%]  mx-auto flex flex-col">
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
