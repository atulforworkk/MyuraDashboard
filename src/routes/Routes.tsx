import CompletedTask from "@/composites/todos/completedTask/CompletedTask";
import NewTask from "@/composites/todos/newTask/NewTask";
import HomePageLayout from "@/views/layout/HomePageLayout";
import Register from "@/views/pages/register/Register";
import { Navigate, createBrowserRouter } from "react-router-dom";
import PreAuthLayout from "../views/layout/PreAuthLayout";
import Login from "../views/pages/login/Login";
import PageNotFound from "@/components/pageNotFound/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/views/pages/dashboard/Dashboard";
import Orders from "@/views/pages/orders/Orders";
import Customers from "@/views/pages/customers/Customers";
import Discounts from "@/views/pages/discounts/Discounts";
import Products from "@/views/pages/products/Products";
import CustomerPage from "@/views/pages/customerPage/CustomerPage";
import AddProduct from "@/views/pages/addProduct/AddProduct";
import NewDiscount from "@/views/pages/newDiscount/NewDiscount";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PreAuthLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/home",
    element: (
      // <PrivateRoute>
      <HomePageLayout />
      //  </PrivateRoute>
    ),
    children: [
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "customer/:customerId",
        element: <CustomerPage />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "discounts",
        element: <Discounts />,
      },
      {
        path:"add-product",
        element:<AddProduct/>
      },
      {
        path:"new-discount",
        element:<NewDiscount/>
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
