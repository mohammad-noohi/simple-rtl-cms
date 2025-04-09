import { createBrowserRouter } from "react-router-dom";
import AdminPanelLayout from "./pages/layout/AdminPanelLayout";
import ProductsPage from "./pages/admin/productsPage/ProductsPage";
import CommentsPage from "./pages/admin/commentsPage/CommentsPage";
import UsersPage from "./pages/admin/usersPage/UsersPage";
import OrdersPage from "./pages/admin/ordersPage/OrdersPage";
import OffersPage from "./pages/admin/offersPage/OffersPage";
import NoPage from "./pages/noPage/NoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminPanelLayout />,
    children: [
      { path: "products", element: <ProductsPage /> },
      { path: "comments", element: <CommentsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "offers", element: <OffersPage /> },
    ],
  },

  // 404 Error Page
  { path: "*", element: <NoPage /> },
]);

export default router;
