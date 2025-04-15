import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./CommentsPage.css";
import ErrorBox from "./../../../components/errorBox/ErrorBox";
import DetailsModal from "./../../../components/detailsModal/DetailsModal";
import DeleteModal from "./../../../components/deleteModal/DeleteModal";

export default function CommentsPage() {
  // States
  const [allComments, setAllComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [isOpenDeleteCommentModal, setIsOpenDeleteCommentModal] = useState(false);
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
    console.log("open comment modal");
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
                        <button className="btn btn-warning">ویرایش</button>
                        <button className="btn btn-primary">پاسخ</button>
                        <button className="btn btn-success">تایید</button>
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

      {isOpenDeleteCommentModal && (
        <DeleteModal
          submitAction={removeComment}
          cancelAction={() => setIsOpenDeleteCommentModal(false)}
          onClose={() => {
            setIsOpenDeleteCommentModal(false);
          }}
        />
      )}
    </div>
  );
}
