import React, { useEffect, useRef } from "react";
import "./DetailsModal.css";

export default function DetailsModal({ onClose }) {
  // Element Ref
  const backdropRef = useRef();

  // close modal with escape key
  useEffect(() => {
    const escapeHandler = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keyup", escapeHandler);

    // Clean UP
    return () => {
      window.removeEventListener("keyup", escapeHandler);
    };
  }, [onClose]);

  // close with backdrop
  useEffect(() => {
    const backdropElm = backdropRef.current;

    const closeDetailsModalWithBackdrop = e => {
      if (e.target === backdropElm) {
        onClose();
      }
    };

    backdropElm.addEventListener("click", closeDetailsModalWithBackdrop);

    return () => {
      backdropElm.removeEventListener("click", closeDetailsModalWithBackdrop);
    };
  });

  return (
    <div className="modal-backdrop active" ref={backdropRef}>
      <div className="details-modal">
        <div className="table-responsive">
          <table className="table text-nowrap text-nowrap">
            <thead>
              <tr>
                <th>اسم</th>
                <th>قیمت</th>
                <th>محبوبیت</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>iphone 16</td>
                <td>۴۰۰۰۰۰۰۰ تومان</td>
                <td>91</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
