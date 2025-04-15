import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./DeleteModal.css";

export default function DeleteModal({ title, submitAction, cancelAction, onClose }) {
  // Elements Ref
  const backdropRef = useRef();

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

  // close modal with backdrop
  useEffect(() => {
    const backdropElm = backdropRef.current;

    const closeDeleteModalWithBackdrop = e => {
      if (e.target === backdropElm) {
        onClose();
      }
    };

    backdropElm.addEventListener("click", closeDeleteModalWithBackdrop);

    // cleann up
    return () => {
      backdropElm.removeEventListener("click", closeDeleteModalWithBackdrop);
    };
  });

  return ReactDOM.createPortal(
    <div className="modal-backdrop active" ref={backdropRef}>
      <div className="delete-modal">
        <h1 className="modal-title">{title}</h1>
        <div className="delete-modal-btns">
          <button className="delete-btn delete-modal-accept-btn" onClick={submitAction}>
            بله
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
