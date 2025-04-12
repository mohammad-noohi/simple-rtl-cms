import React from "react";

export default function ErrorBox({ msg }) {
  return (
    <div className="alert alert-danger mt-5">
      <p className="fs-4">{msg}</p>
    </div>
  );
}
