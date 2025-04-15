import React, { useEffect, useState } from "react";
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
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    count: "",
    img: "",
    popularity: "",
    sale: "",
    colors: "",
  });

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
      })
        .then(resp => {
          if (resp.ok) {
            getAllProducts();
            closeEditModal();
          }
        })
        .then(data => {
          console.log(data);
        }),
      {
        pending: "در حال اعمال تغییرات ...",
        success: "تغییرات اعمال شد",
        error: "مشکلی پیش آمده دوباره تلاش کنید",
      }
    );
  };

  const addNewProduct = e => {
    e.preventDefault();

    console.log("🟢 Product submit triggered", newProduct); // این باید چاپ بشه

    fetch(`http://localhost:3000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(resp => {
      console.log(resp);
      if (resp.ok) {
        getAllProducts();
      }
    });
  };

  return (
    <>
      <div>
        <h1 className="fs-1 fw-bold">افزودن محصول جدید</h1>
        <section className="add-product-from-sec mt-5 bg-white p-4 rounded shadow">
          <form action="#" onSubmit={addNewProduct}>
            <div className="form-wrapper row g-3">
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <LuPencil className="icon" />
                  <input
                    type="text"
                    placeholder="نام محصول"
                    onChange={e => {
                      setNewProduct({ ...newProduct, title: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <AiOutlineDollarCircle className="icon" />
                  <input
                    type="text"
                    placeholder="قیمت محصول"
                    onChange={e => {
                      setNewProduct({ ...newProduct, price: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <MdStorefront className="icon" />
                  <input
                    type="text"
                    placeholder="موجودی محصول"
                    onChange={e => {
                      setNewProduct({ ...newProduct, count: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <LuLink className="icon" />
                  <input
                    style={{ textAlign: "left", direction: "ltr" }}
                    type="text"
                    placeholder="آدرس عکس محصول"
                    onChange={e => {
                      setNewProduct({ ...newProduct, img: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <MdOutlineColorLens className="icon" />
                  <input
                    type="text"
                    placeholder="رنگ بندی محصول"
                    onChange={e => {
                      setNewProduct({ ...newProduct, colors: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <FaRegHeart className="icon" />
                  <input
                    type="text"
                    placeholder="میزان محبوبیت محصول"
                    onChange={e => {
                      setNewProduct({ ...newProduct, popularity: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="input-group">
                  <PiChartLineUpBold className="icon" />
                  <input
                    type="text"
                    placeholder="میزان فروش محصول"
                    onChange={e => {
                      setNewProduct({ ...newProduct, sale: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="add-product__btn">
              ثبت محصول
            </button>
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
                  {allProducts.map(product => (
                    <tr key={product.id}>
                      <td className="table-product__img border align-middle">
                        <img width="60px" height="60px" src={product.img} alt="" className="table-product__img" />
                      </td>
                      <td className="border align-middle">{product.title}</td>
                      <td className="border align-middle">{product.price.toLocaleString()} تومان</td>
                      <td className="border align-middle">{product.count}</td>
                      <td className="border align-middle">
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              openDetailsModal(product);
                            }}>
                            جزئیات
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setProductID(product.id);
                              openDeleteModal();
                            }}>
                            حذف
                          </button>
                          <button
                            className="btn btn-warning"
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

      {isDeleteModalOpen && <DeleteModal title={"آیا از حذف اطمینان دارید ؟"} submitAction={deleteModalSubmitAction} cancelAction={deleteModalCancelAction} onClose={closeDeleteModal} />}

      {isDetailsModalOpen && (
        <DetailsModal onClose={closeDetailsModal}>
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
                  <td className="border p-2">{mainProduct.title}</td>
                  <td className="border p-2">{mainProduct.price.toLocaleString()} تومان</td>
                  <td className="border p-2">{mainProduct.popularity} درصد</td>
                  <td className="border p-2">{mainProduct.count}</td>
                  <td className="border p-2">{mainProduct.sale.toLocaleString()}</td>
                  <td className="border p-2">{mainProduct.colors}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DetailsModal>
      )}

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
                value={mainProduct.price.toLocaleString()}
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
                readOnly
                disabled
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
          <div className="edit-product">
            <div className="edit-product__input-group">
              <FaRegHeart className="icon edit-product__input-group-icon" />
              <input
                type="number"
                className="edit-product__input"
                placeholder="میزان محبوبیت"
                value={mainProduct.popularity}
                onChange={e => {
                  setMainProduct({ ...mainProduct, popularity: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <PiChartLineUpBold className="icon edit-product__input-group-icon" />
              <input type="number" className="edit-product__input" placeholder="میزان فروش" value={mainProduct.sale} onChange={e => setMainProduct({ ...mainProduct, sale: e.target.value })} />
            </div>
          </div>
          <div className="edit-product">
            <div className="edit-product__input-group">
              <MdOutlineColorLens className="icon edit-product__input-group-icon" />
              <input type="number" className="edit-product__input" placeholder="رنگ بندی" value={mainProduct.colors} onChange={e => setMainProduct({ ...mainProduct, colors: e.target.value })} />
            </div>
          </div>
        </EditModal>
      )}
    </>
  );
}
