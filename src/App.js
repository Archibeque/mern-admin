import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import RegisterAdmin from "./pages/register/Register";
import LandingPage from "./pages/landing/landing";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/forgot/Forgot";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public routes */}
        <Route
          path="/landing"
          element={admin ? <Navigate to="/" /> : <LandingPage />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
        </Route>

        {/* Catch-all → landing */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
