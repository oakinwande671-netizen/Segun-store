import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Login from "./pages/Login";
import SignUp from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Product from "./pages/Product";
import DashboardLayout from "./components/DashboardLayout"; // import this
import { ProtectedRoute } from "./components/ProtectedRoute"; //add this
import AddUser from "./pages/AddUser";  // import this
import ShowUsers from "./pages/ShowUsers";
import ChangePassword from "./pages/ChangePassword"; // import

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<ShowUsers />} />
          <Route path="change-pwd" element={<ChangePassword />} />

          {/* Products */}
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          {/* add this line */}
          <Route path="add-user" element={<AddUser />} /> 
        </Route>

      </Routes>
    </Router>
  );
}