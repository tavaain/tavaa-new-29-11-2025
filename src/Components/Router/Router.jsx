import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AdminProtectedRoute from "./AdminProtectedRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AdminLogin from "../Pages/Dashboard/AdminLogin";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Users from "../Pages/Dashboard/Users/Users";
import AddCategory from "../Pages/Dashboard/AddCategory/AddCategory";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Slider from "../Pages/Dashboard/Slider/Slider";
import Orders from "../Pages/Dashboard/Orders/Orders";
import OrderDetails from "../Pages/Dashboard/Orders/OrderDetails";
import Admin from "../Pages/Dashboard/Admin/Admin";
import Login from "../Authentication/Login";
import CreateAccount from "../Authentication/CreateAccount";
import Cart from "../AllComponents/Cart/Cart";
import ShopPage from "../AllComponents/Shop/ShopPage";
import ProductDtl from "../AllComponents/Shop/ProductDetls/ProductDtl";
import About from "../AllComponents/About/About";
import NewArrivalPage from "../Pages/NewArrivalPage/NewArrivalPage";
import Shoop from "../Pages/Shoop/Shoop";
import PrivacyPolicy from "../Pages/Policy/PrivacyPolicy";
import YourOrders from "../Pages/YourOrders/YourOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/PrivacyPolicy", element: <PrivacyPolicy /> },
      { path: "/Login", element: <Login /> },
      { path: "/About", element: <About /> },
      { path: "/CreateAccount", element: <CreateAccount /> },
      { path: "/cart", element: <Cart /> },
      { path: "/ShopPage", element: <Shoop /> },
      { path: "/NewArrival", element: <NewArrivalPage /> },
      { path: "/yourOrders", element: <YourOrders /> },
      { path: "/product/:id", element: <ProductDtl />,
        loader: async ({ params }) =>
          fetch(
            `https://myproject-tau-brown.vercel.app/api/product/${params.id}`
          )
       },
    ],
  },
  {
    path: "/dashboard",
    element: (
       <AdminProtectedRoute>
      <DashboardLayout />
       </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <AdminProtectedRoute>
          <DashboardHome />
           </AdminProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
         <AdminProtectedRoute>
            <Users />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "addCategory",
        element: (
          <AdminProtectedRoute>
            <AddCategory />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <AdminProtectedRoute>
            <AddProduct />
           </AdminProtectedRoute>
        ),
      },
      {
        path: "addSlider",
        element: (
           <AdminProtectedRoute>
            <Slider />
           </AdminProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
           <AdminProtectedRoute>
            <Orders />
           </AdminProtectedRoute>
        ),
      },
      {
        path: "order/:id",
        element: (
           <AdminProtectedRoute>
            <OrderDetails />
           </AdminProtectedRoute>
        ),
      },
      
      {
        path: "admin",
        element: (
          <AdminProtectedRoute>
            <Admin />
           </AdminProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/adminLoginPanel",
    element: <AdminLogin />,
  },
]);
