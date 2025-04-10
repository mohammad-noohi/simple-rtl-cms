import React from "react";
import ErrorBox from "../../../components/errorBox/ErrorBox";
import "./ProductsPage.css";
// icons
import { LuPencil } from "react-icons/lu";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";
import { LuLink } from "react-icons/lu";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";

export default function ProductsPage() {
  return (
    <>
      {/* <ErrorBox msg="هیچ محصولی یافت نشد" /> */}
      <div>
        <h1 className="fs-1 fw-bold">افزودن محصول جدید</h1>
        <section className="add-product-from-sec mt-5 shadow">
          <form action="#">
            <div className="form-wrapper row g-3">
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <LuPencil className="icon" />
                  <input type="text" placeholder="نام محصول" />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <AiOutlineDollarCircle className="icon" />
                  <input type="text" placeholder="قیمت محصول" />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <MdStorefront className="icon" />
                  <input type="text" placeholder="موجودی محصول" />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <LuLink className="icon" />
                  <input type="text" placeholder="آدرس عکس محصول" />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <MdOutlineColorLens className="icon" />
                  <input type="text" placeholder="رنگ بندی محصول" />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <FaRegHeart className="icon" />
                  <input type="text" placeholder="میزان محبوبیت محصول" />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <PiChartLineUpBold className="icon" />
                  <input type="text" placeholder="میزان فروش محصول" />
                </div>
              </div>
            </div>

            <button className="add-product__btn">ثبت محصول</button>
          </form>
        </section>
      </div>
    </>
  );
}
