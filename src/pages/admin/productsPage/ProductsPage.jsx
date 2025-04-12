import React, { useState } from "react";
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
import DetailsModal from "../../../components/detailsModal/DetailsModal";
import EditModal from "../../../components/editModal/EditModal";

export default function ProductsPage() {
  // States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // DeleteModal Actions ---
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const deleteModalSubmitAction = () => {
    console.log("submit action run");
    closeDeleteModal();
  };

  const deleteModalCancelAction = () => {
    console.log("cancel action run");
    closeDeleteModal();
  };

  // DetailsModal Actions --
  const openDetailsModal = () => setIsDetailsModalOpen(true);
  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  // EditModal Actions ---
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const editModalSubmitHandler = event => {
    event.preventDefault();
    console.log("edit modal submit");
  };

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
                      <button className="btn " style={{ backgroundColor: "#a58eff" }} onClick={openDetailsModal}>
                        جزئیات
                      </button>
                      <button className="btn " style={{ backgroundColor: "#e03a3a" }} onClick={openDeleteModal}>
                        حذف
                      </button>
                      <button className="btn " style={{ backgroundColor: "#16a3b8" }} onClick={openEditModal}>
                        ویرایش
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {isDeleteModalOpen && <DeleteModal submitAction={deleteModalSubmitAction} cancelAction={deleteModalCancelAction} onClose={closeDeleteModal} />}

      {isDetailsModalOpen && <DetailsModal onClose={closeDetailsModal} />}

      {isEditModalOpen && (
        <EditModal onClose={closeEditModal} onSubmitHandler={editModalSubmitHandler}>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <LuPencil className="icon edit-product__input-group-icon" />
              <input type="text" className="edit-product__input" placeholder="عنوان جدید" />
            </div>
          </div>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <AiOutlineDollarCircle className="icon edit-product__input-group-icon" />
              <input type="text" className="edit-product__input" placeholder="عنوان جدید" />
            </div>
          </div>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <MdStorefront className="icon edit-product__input-group-icon" />
              <input type="text" className="edit-product__input" placeholder="عنوان جدید" />
            </div>
          </div>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <LuLink className="icon edit-product__input-group-icon" />
              <input type="text" className="edit-product__input" placeholder="عنوان جدید" />
            </div>
          </div>
        </EditModal>
      )}
    </>
  );
}
