import "./EditModal.css";
import React, { useEffect, useRef } from "react";

export default function EditModal({ children, onClose, onSubmitHandler }) {
  // Elements Ref
  const backdropRef = useRef();

  // close modal with ESC key
  useEffect(() => {
    const closeEditModalWithEsc = event => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keyup", closeEditModalWithEsc);

    // clean up
    return () => {
      window.removeEventListener("keyup", closeEditModalWithEsc);
    };
  });

  // close with backdrop
  useEffect(() => {
    const backdropElm = backdropRef.current;

    const closeEditModalWithBackdrop = e => {
      if (e.target === backdropElm) {
        onClose();
      }
    };

    backdropElm.addEventListener("click", closeEditModalWithBackdrop);

    // clean up
    return () => {
      backdropElm.removeEventListener("click", closeEditModalWithBackdrop);
    };
  });

  return (
    <div className="modal-backdrop active" ref={backdropRef}>
      <div className="edit-modal">
        <form className="edit-modal__form" onSubmit={onSubmitHandler}>
          <h4 className="edit-modal__title">اطلاعات جدید را وارد نمایید</h4>
          {children}
          <div className="d-flex align-items-center gap-2 mt-4">
            <button type="submit" className="edit-modal__submit-btn m-0">
              ویرایش
            </button>
            <button type="button" className="edit-modal__cancel-btn m-0" onClick={onClose}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
