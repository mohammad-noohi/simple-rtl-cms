import React from "react";
import "./NoPage.css";
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center flex-column gap-3">
      <img className="error-img" src="/img/404-error.svg" alt="" />
      <h1 className="fs-1">صفحه ی مورد نظر یافت نشد </h1>
      <Link className="error-btn link" to="/">
        صفحه ی اصلی
      </Link>
    </div>
  );
}
