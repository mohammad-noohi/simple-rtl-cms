import React, { useEffect, useState } from "react";
import ErrorBox from "../../../components/errorBox/ErrorBox";
import "./ProductsPage.css";
// icons
import { LuPencil } from "react-icons/lu";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";
import { LuLink } from "react-icons/lu";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaRegHeart, FaSadCry } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import DetailsModal from "../../../components/detailsModal/DetailsModal";
import EditModal from "../../../components/editModal/EditModal";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api";

export default function ProductsPage() {
  // States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productID, setProductID] = useState(null);
  const [mainProduct, setMainProduct] = useState(null);

  const getAllProducts = () => {
    fetch(`http://localhost:3000/api/products`)
      .then(resp => resp.json())
      .then(products => {
        setAllProducts(products);
        setLoadingProducts(false); // finish fetch data and get response
      })
      .catch(() => {
        setAllProducts([]);
        setLoadingProducts(false);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // DeleteModal Actions ---
  const openDeleteModal = () => setIsDeleteModalOpen(true);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const deleteModalSubmitAction = () => {
    toast.promise(
      fetch(`http://localhost:3000/api/products/${productID}`, {
        method: "DELETE",
      }).then(resp => {
        if (resp.ok) {
          getAllProducts();
          closeDeleteModal();
        }
      }),
      {
        pending: "درحال حذف ...",
        success: "محصول با موفقیت حذف شد",
        error: "مشکلی پیش آمده",
      }
    );
  };

  const deleteModalCancelAction = () => {
    console.log("cancel action run");
    closeDeleteModal();
  };

  // DetailsModal Actions --
  const openDetailsModal = product => {
    setIsDetailsModalOpen(true);
    setMainProduct(product);
  };

  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  // EditModal Actions ---
  const openEditModal = product => {
    setIsEditModalOpen(true);
    setMainProduct(product);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const editModalSubmitHandler = event => {
    event.preventDefault();

    toast.promise(
      fetch(`http://localhost:3000/api/products/${mainProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: mainProduct.title,
          price: mainProduct.price,
          count: mainProduct.count,
          img: mainProduct.img,
          popularity: mainProduct.popularity,
          sale: mainProduct.sale,
          colors: mainProduct.colors,
        }),
      }).then(resp => {
        if (resp.ok) {
          getAllProducts();
          closeEditModal();
        }
      }),
      {
        pending: "در حال اعمال تغییرات ...",
        success: "تغییرات اعمال شد",
        error: "مشکلی پیش آمده دوباره تلاش کنید",
      }
    );
  };

  return (
    <>
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

        {loadingProducts ? (
          <div className="spinner-border mt-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : allProducts.length > 0 ? (
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
                  {allProducts?.map(product => (
                    <tr key={product.id}>
                      <td className="table-product__img border align-middle">
                        <img width="60px" height="60px" src={product.img} alt="" className="table-product__img" />
                      </td>
                      <td className="border align-middle">{product.title}</td>
                      <td className="border align-middle">{product.price} تومان</td>
                      <td className="border align-middle">{product.count}</td>
                      <td className="border align-middle">
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="btn "
                            style={{ backgroundColor: "#a58eff" }}
                            onClick={() => {
                              openDetailsModal(product);
                            }}>
                            جزئیات
                          </button>
                          <button
                            className="btn "
                            style={{ backgroundColor: "#e03a3a" }}
                            onClick={() => {
                              setProductID(product.id);
                              openDeleteModal();
                            }}>
                            حذف
                          </button>
                          <button
                            className="btn "
                            style={{ backgroundColor: "#16a3b8" }}
                            onClick={() => {
                              openEditModal(product);
                            }}>
                            ویرایش
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <ErrorBox msg="هیچ محصولی یافت نشد" />
        )}
      </div>

      {isDeleteModalOpen && <DeleteModal submitAction={deleteModalSubmitAction} cancelAction={deleteModalCancelAction} onClose={closeDeleteModal} />}

      {isDetailsModalOpen && <DetailsModal onClose={closeDetailsModal} productData={mainProduct} />}

      {isEditModalOpen && (
        <EditModal onClose={closeEditModal} onSubmitHandler={editModalSubmitHandler}>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <LuPencil className="icon edit-product__input-group-icon" />
              <input
                type="text"
                className="edit-product__input"
                placeholder="عنوان جدید"
                value={mainProduct.title}
                onChange={e => {
                  setMainProduct({ ...mainProduct, title: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <AiOutlineDollarCircle className="icon edit-product__input-group-icon" />
              <input
                type="text"
                className="edit-product__input"
                placeholder="قیمت جدید"
                value={mainProduct.price}
                onChange={e => {
                  setMainProduct({ ...mainProduct, price: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <MdStorefront className="icon edit-product__input-group-icon" />
              <input
                type="text"
                className="edit-product__input"
                placeholder="موجودی جدید"
                value={mainProduct.count}
                onChange={e => {
                  setMainProduct({ ...mainProduct, count: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <LuLink className="icon edit-product__input-group-icon" />
              <input
                style={{ textAlign: "left" }}
                type="text"
                className="edit-product__input"
                placeholder="تصویر جدید"
                value={mainProduct.img}
                onChange={e => {
                  setMainProduct({ ...mainProduct, img: e.target.value });
                }}
              />
            </div>
          </div>
        </EditModal>
      )}
    </>
  );
}
