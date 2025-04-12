import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./DeleteModal.css";

export default function DeleteModal({ submitAction, cancelAction, onClose }) {
  // close modal with escape key
  useEffect(() => {
    const escapeHandler = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keyup", escapeHandler);

    return () => {
      window.removeEventListener("keyup", escapeHandler);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="delete-modal">
        <h1 className="modal-title">آیا از حذف اطمینان دارید ؟</h1>
        <div className="delete-modal-btns">
          <button className="delete-btn delete-modal-accept-btn" onClick={submitAction}>
            حذف
          </button>
          <button className="delete-btn delete-modal-reject-btn" onClick={cancelAction}>
            خیر
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-wrapper-portal")
  );
}
