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
import DeleteModal from "../../../components/deleteModal/DeleteModal";

export default function ProductsPage() {
  return (
    <>
      {/* <ErrorBox msg="هیچ محصولی یافت نشد" /> */}
      <div>
        <h1 className="fs-1 fw-bold">افزودن محصول جدید</h1>
        <section className="add-product-from-sec mt-5 bg-white p-4 rounded shadow">
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

        <section className="products-table mt-5 bg-white p-4 rounded shadow">
          <h2 className="fs-2 fw-bold">محصولات</h2>
          <div className="table-responsive mt-4">
            <table className="table table-striped table-hover align-middle  border text-center text-nowrap">
              <thead>
                <tr>
                  <th className="fw-bold border">عکس</th>
                  <th className="fw-bold border">اسم</th>
                  <th className="fw-bold border">قیمت</th>
                  <th className="fw-bold border">موجودی</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-product__img border align-middle">
                    <img
                      width="60px"
                      height="60px"
                      src="https://dkstatics-public.digikala.com/digikala-products/13d979a81d76d60e37dd3ae9aec6d21c099590c6_1736598864.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
                      alt=""
                      className="table-product__img"
                    />
                  </td>
                  <td className="border align-middle">iphone 16 pro max</td>
                  <td className="border align-middle">۴۰۰۰۰۰۰ تومان</td>
                  <td className="border align-middle">15</td>
                  <td className="border align-middle">
                    <div className="d-flex justify-content-center gap-3">
                      <button className="btn btn-info">details</button>
                      <button className="btn btn-danger">delete</button>
                      <button className="btn btn-warning">edit</button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="table-product__img border align-middle">
                    <img
                      width="60px"
                      height="60px"
                      src="https://dkstatics-public.digikala.com/digikala-products/13d979a81d76d60e37dd3ae9aec6d21c099590c6_1736598864.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
                      alt=""
                      className="table-product__img"
                    />
                  </td>
                  <td className="border align-middle">iphone 16 pro max</td>
                  <td className="border align-middle">۴۰۰۰۰۰۰ تومان</td>
                  <td className="border align-middle">15</td>
                  <td className="border align-middle">
                    <div className="d-flex justify-content-center gap-3">
                      <button className="btn btn-info">details</button>
                      <button className="btn btn-danger">delete</button>
                      <button className="btn btn-warning">edit</button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="table-product__img border align-middle">
                    <img
                      width="60px"
                      height="60px"
                      src="https://dkstatics-public.digikala.com/digikala-products/13d979a81d76d60e37dd3ae9aec6d21c099590c6_1736598864.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
                      alt=""
                      className="table-product__img"
                    />
                  </td>
                  <td className="border align-middle">iphone 16 pro max</td>
                  <td className="border align-middle">۴۰۰۰۰۰۰ تومان</td>
                  <td className="border align-middle">15</td>
                  <td className="border align-middle">
                    <div className="d-flex justify-content-center gap-3">
                      <button className="btn btn-info">details</button>
                      <button className="btn btn-danger">delete</button>
                      <button className="btn btn-warning">edit</button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="table-product__img border align-middle">
                    <img
                      width="60px"
                      height="60px"
                      src="https://dkstatics-public.digikala.com/digikala-products/13d979a81d76d60e37dd3ae9aec6d21c099590c6_1736598864.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
                      alt=""
                      className="table-product__img"
                    />
                  </td>
                  <td className="border align-middle">iphone 16 pro max</td>
                  <td className="border align-middle">۴۰۰۰۰۰۰ تومان</td>
                  <td className="border align-middle">15</td>
                  <td className="border align-middle">
                    <div className="d-flex justify-content-center gap-3">
                      <button className="btn btn-info">details</button>
                      <button className="btn btn-danger">delete</button>
                      <button className="btn btn-warning">edit</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* <DeleteModal /> */}
    </>
  );
}
