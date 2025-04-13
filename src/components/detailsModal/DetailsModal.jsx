import React, { useEffect, useRef } from "react";
import "./DetailsModal.css";

export default function DetailsModal({ onClose, productData }) {
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
        <h5 className="fs-4 fw-bold text-start mb-4">جزئیات :</h5>
        <div className="table-responsive">
          <table className="table text-nowrap text-nowrap border">
            <thead>
              <tr>
                <th className="border p-2">اسم</th>
                <th className="border p-2">قیمت</th>
                <th className="border p-2">محبوبیت</th>
                <th className="border p-2">تعداد</th>
                <th className="border p-2">فروش</th>
                <th className="border p-2">رنگ ها</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">{productData.title}</td>
                <td className="border p-2">{productData.price} تومان</td>
                <td className="border p-2">{productData.popularity} درصد</td>
                <td className="border p-2">{productData.count}</td>
                <td className="border p-2">{productData.sale}</td>
                <td className="border p-2">{productData.colors}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
