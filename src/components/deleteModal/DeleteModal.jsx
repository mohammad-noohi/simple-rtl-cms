import React from "react";
import ReactDOM from "react-dom";
import "./DeleteModal.css";

export default function DeleteModal() {
  return ReactDOM.createPortal(
    <div class="modal-backdrop active">
      <div className="delete-modal">
        <h1 className="modal-title">آیا از حذف اطمینان دارید ؟</h1>
        <div className="delete-modal-btns">
          <button className="delete-btn delete-modal-accept-btn">حذف</button>
          <button className="delete-btn delete-modal-reject-btn">خیر</button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-wrapper-portal")
  );
}
