import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./CommentsPage.css";
// icons
import { IoCheckmarkDoneSharp } from "react-icons/io5";
// components
import ErrorBox from "./../../../components/errorBox/ErrorBox";
import DetailsModal from "./../../../components/detailsModal/DetailsModal";
import DeleteModal from "./../../../components/deleteModal/DeleteModal";
import EditModal from "./../../../components/editModal/EditModal";

export default function CommentsPage() {
  // States
  const [allComments, setAllComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [isOpenDeleteCommentModal, setIsOpenDeleteCommentModal] = useState(false);
  const [isOpenEditCommentModal, setIsOpenEditCommentModal] = useState(false);
  const [isOpenAcceptCommentModal, setIsOpenAcceptCommentModal] = useState(false);
  const [isOpenRejectCommentModal, setIsOpenRejectCommentModal] = useState(false);
  const [mainComment, setMainComment] = useState(null);

  const getAllComments = () => {
    fetch("http://localhost:3000/api/comments")
      .then(resp => resp.json())
      .then(comments => {
        setAllComments(comments);
        setLoadingComments(false);
      })
      .catch(() => {
        setAllComments([]);
        setLoadingComments(false);
      });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const openCommentModal = () => {
    setIsOpenCommentModal(true);
  };

  const removeComment = () => {
    toast.promise(
      fetch(`http://localhost:3000/api/comments/${mainComment.id}`, {
        method: "DELETE",
      }).then(resp => {
        if (resp.ok) {
          getAllComments();
          setIsOpenDeleteCommentModal(false);
        }
      }),
      {
        pending: "درحال حذف کامنت ...",
        success: "کامنت با موفقیت حذف شد",
        error: "مشکلی پیش آمده",
      }
    );
  };

  const editComment = e => {
    e.preventDefault();
    toast.promise(
      fetch(`http://localhost:3000/api/comments/${mainComment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: mainComment.body,
        }),
      }).then(resp => {
        if (resp.ok) {
          getAllComments();
          setIsOpenEditCommentModal(false);
        }
      }),
      {
        pending: "درحال ویرایش ...",
        success: "کامنت با موفقیت ویرایش شد",
        error: "مشکلی پیش آمده",
      }
    );
  };

  const acceptComment = () => {
    toast.promise(
      fetch(`http://localhost:3000/api/comments/accept/${mainComment.id}`, {
        method: "POST",
      }).then(resp => {
        if (resp.ok) {
          getAllComments();
          setIsOpenAcceptCommentModal(false);
        }
      }),
      {
        pending: "در حال تایید ...",
        success: "کامنت تایید شد",
        error: "مشکلی پیش آمده",
      }
    );
  };

  const rejectComment = () => {
    toast.promise(
      fetch(`http://localhost:3000/api/comments/reject/${mainComment.id}`, {
        method: "PUT",
      }).then(resp => {
        if (resp.ok) {
          getAllComments();
          setIsOpenRejectCommentModal(false);
        }
      }),
      {
        pending: "درحال رد کامنت ...",
        success: "کامنت با موفقیت رد شد",
        error: "مشکلی پیش آمده",
      }
    );
  };

  return (
    <div className="comments-page-wrapper">
      {loadingComments ? (
        <div className="spinner-border mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : allComments.length > 0 ? (
        <section className="comments-sec bg-white p-4 rounded shadow">
          <h2 className="fs-2 fw-bold">کامنت ها :</h2>
          <div className="table-responsive mt-4">
            <table className="table table-striped table-hover align-middle  border text-center text-nowrap">
              <thead>
                <tr>
                  <th className="border">اسم کاربر</th>
                  <th className="border">محصول</th>
                  <th className="border">تاریخ</th>
                  <th className="border">ساعت</th>
                  <th className="border">کامنت</th>
                </tr>
              </thead>
              <tbody>
                {allComments.map(comment => (
                  <tr key={comment.id}>
                    <td className="border">{comment.userID}</td>
                    <td className="border">{comment.productID}</td>
                    <td className="border">{comment.date}</td>
                    <td className="border">{comment.hour}</td>
                    <td className="border">
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          openCommentModal();
                          setMainComment(comment);
                        }}>
                        مشاهده
                      </button>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setIsOpenDeleteCommentModal(true);
                            setMainComment(comment);
                          }}>
                          حذف
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setIsOpenEditCommentModal(true);
                            setMainComment(comment);
                          }}>
                          ویرایش
                        </button>
                        <button className="btn btn-primary">پاسخ</button>
                        <button
                          className={`btn btn-success ${comment.isAccept ? "disabled" : ""}`}
                          onClick={() => {
                            setIsOpenAcceptCommentModal(true);
                            setMainComment(comment);
                          }}>
                          {comment.isAccept ? <IoCheckmarkDoneSharp /> : "تایید"}
                        </button>
                        <button
                          className={`btn btn-dark ${!comment.isAccept ? "disabled" : ""}`}
                          onClick={() => {
                            setIsOpenRejectCommentModal(true);
                            setMainComment(comment);
                          }}>
                          تایید نشده
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
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}

      {isOpenCommentModal && (
        <DetailsModal
          onClose={() => {
            setIsOpenCommentModal(false);
          }}>
          <p>{mainComment.body}</p>
          <button className="btn mt-4" style={{ backgroundColor: "#471aaa", color: "#fff" }} onClick={() => setIsOpenCommentModal(false)}>
            متوجه شدم
          </button>
        </DetailsModal>
      )}

      {/* Delete Comment Modal */}
      {isOpenDeleteCommentModal && (
        <DeleteModal
          title={"آیا از حذف اطمینان دارید ؟"}
          submitAction={removeComment}
          cancelAction={() => setIsOpenDeleteCommentModal(false)}
          onClose={() => {
            setIsOpenDeleteCommentModal(false);
          }}
        />
      )}

      {isOpenEditCommentModal && (
        <EditModal onClose={() => setIsOpenEditCommentModal(false)} onSubmitHandler={editComment}>
          <div className="edit-comment">
            <div className="edit-comment__input-group">
              <textarea
                style={{ minHeight: "150px" }}
                type="text"
                className="edit-comment__input"
                placeholder="کامنت جدید"
                value={mainComment.body}
                onChange={e => setMainComment({ ...mainComment, body: e.target.value })}
              />
            </div>
          </div>
        </EditModal>
      )}

      {/* Accept Comment Modal */}
      {isOpenAcceptCommentModal && (
        <DeleteModal title={"آیا از تایید اطمینان دارید ؟"} submitAction={acceptComment} cancelAction={() => setIsOpenAcceptCommentModal(false)} onClose={() => setIsOpenAcceptCommentModal(false)} />
      )}

      {/* Reject Comment Modal */}
      {isOpenRejectCommentModal && (
        <DeleteModal
          title={"آیا از رد کامنت اطمینان دارید ؟"}
          submitAction={rejectComment}
          cancelAction={() => setIsOpenRejectCommentModal(false)}
          onClose={() => setIsOpenRejectCommentModal(false)}
        />
      )}
    </div>
  );
}
