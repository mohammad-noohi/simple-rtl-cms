import React, { useEffect } from "react";
import "./DetailsModal.css";

export default function DetailsModal({ onClose }) {
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

  return (
    <div className="modal-backdrop active" onClick={onClose}>
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
