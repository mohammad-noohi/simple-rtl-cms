import React, { useEffect, useState } from "react";
import "./UsersPage.css";
// icons
import { LuPencil } from "react-icons/lu";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { toast } from "react-toastify";

// components
import ErrorBox from "./../../../components/errorBox/ErrorBox";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import EditModal from "../../../components/editModal/EditModal";

export default function UsersPage() {
  // States ------------------
  const [allUsers, setAllUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [mainUser, setMainUser] = useState(null);

  // Functions & Actions & EventsHandlers ---------------
  const getAllUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then(resp => resp.json())
      .then(users => {
        setAllUsers(users);
        setUsersLoading(false);
      })
      .catch(() => {
        setAllUsers([]);
        setUsersLoading(false);
      });
  };

  const openDeleteModal = () => setShowDeleteUserModal(true);
  const closeDeleteModal = () => setShowDeleteUserModal(false);
  const deletUser = e => {
    e.preventDefault();

    console.log("delete user");

    toast.promise(
      fetch(`http://localhost:3000/api/users/${mainUser.id}`, {
        method: "DELETE",
      }).then(resp => {
        if (resp.ok) {
          getAllUsers();
          closeDeleteModal();
        }
      }),
      {
        pending: "درحال حذف کاربر ...",
        success: "کاربر با موفقیت حذف شد",
        error: "مشکلی پیش آمده",
      }
    );
  };

  const openEditModal = () => setShowEditUserModal(true);
  const closeEditModal = () => setShowEditUserModal(false);
  const editUser = e => {
    e.preventDefault();

    toast.promise(
      fetch(`http://localhost:3000/api/users/${mainUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firsname: mainUser.firsname,
          lastname: mainUser.lastname,
          username: mainUser.username,
          password: mainUser.password,
          phone: mainUser.phone,
          city: mainUser.city,
          email: mainUser.email,
          address: mainUser.address,
          score: mainUser.score,
          buy: mainUser.buy,
        }),
      }).then(resp => {
        if (resp.ok) {
          getAllUsers();
          closeEditModal();
        }
      }),
      {
        pending: "درحال ویرایش ...",
        success: "کاربر با موفقیت ویرایش شد",
        error: "مشکلی پیش آمده",
      }
    );
  };

  // Effects ---------------
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="users-page-wrapper">
      <section className="users-section bg-white p-4 rounded">
        <h2 className="fs-2 fw-bold">لیست کاربران :</h2>
        {usersLoading ? (
          <div className="spinner-border mt-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : allUsers.length > 0 ? (
          <div className="table-responsive mt-4">
            <table className="table table-hover table-striped text-nowrap">
              <thead>
                <tr>
                  <th className="border">نام</th>
                  <th className="border">نام خانوادگی</th>
                  <th className="border">یوزرنیم</th>
                  <th className="border">تلفن</th>
                  <th className="border">شهر</th>
                  <th className="border">ایمیل</th>
                  <th className="border">آدرس</th>
                  <th className="border">امتیاز</th>
                  <th className="border">خرید</th>
                  <th className="border"></th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <tr key={user.id}>
                    <td className="border">{user.firsname}</td>
                    <td className="border">{user.lastname}</td>
                    <td className="border">{user.username}</td>
                    <td className="border">{user.phone}</td>
                    <td className="border">{user.city}</td>
                    <td className="border">{user.email}</td>
                    <td className="border">{user.address}</td>
                    <td className="border">{user.score}</td>
                    <td className="border">{user.buy.toLocaleString()} تومان</td>
                    <td className="border">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            openDeleteModal();
                            setMainUser(user);
                          }}>
                          حذف
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            openEditModal();
                            setMainUser(user);
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
        ) : (
          <ErrorBox msg="هیچ کاربری یافت نشد" />
        )}
      </section>

      {showDeleteUserModal && <DeleteModal title={"آیا از حذف کاربر اطیمنان دارید ؟"} submitAction={deletUser} onClose={closeDeleteModal} cancelAction={closeDeleteModal} />}
      {showEditUserModal && (
        <EditModal onClose={closeEditModal} onSubmitHandler={editUser}>
          <div className="row">
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <LuPencil className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="نام "
                    value={mainUser.firsname}
                    onChange={e => {
                      setMainUser({ ...mainUser, firsname: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <LuPencil className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="نام خانوادگی "
                    value={mainUser.lastname}
                    onChange={e => {
                      setMainUser({ ...mainUser, lastname: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <CgProfile className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="یوزرنیم"
                    value={mainUser.username}
                    onChange={e => {
                      setMainUser({ ...mainUser, username: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <TbLockPassword className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="پسورد"
                    value={mainUser.password}
                    onChange={e => {
                      setMainUser({ ...mainUser, password: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <FiPhone className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="تلفن"
                    value={mainUser.phone}
                    onChange={e => {
                      setMainUser({ ...mainUser, phone: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <SlLocationPin className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="شهر"
                    value={mainUser.city}
                    onChange={e => {
                      setMainUser({ ...mainUser, city: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <MdOutlineEmail className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="ایمیل"
                    value={mainUser.email}
                    onChange={e => {
                      setMainUser({ ...mainUser, email: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <GoHome className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="آدرس"
                    value={mainUser.address}
                    onChange={e => {
                      setMainUser({ ...mainUser, address: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <FaRegStar className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="امتیاز"
                    value={mainUser.score}
                    onChange={e => {
                      setMainUser({ ...mainUser, score: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="edit-user">
                <div className="edit-user__input-group">
                  <AiOutlineDollarCircle className="icon edit-user__input-group-icon" />
                  <input
                    type="text"
                    className="edit-user__input"
                    placeholder="خرید"
                    value={mainUser.buy}
                    onChange={e => {
                      setMainUser({ ...mainUser, buy: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </EditModal>
      )}
    </div>
  );
}
