import { Route, Routes } from "react-router-dom";
import './App.css'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import Layout1 from "./admin/Layout1.jsx";
import AdminLoginPage from "./admin/components/AdminLoginPage.jsx"
import { useState } from "react";
import AddHotel from "./admin/components/AddHotel.jsx";
import Dashboard from "./admin/components/dashboard.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingDetails from "./admin/components/BookingDetails.jsx";
import SavedHotels from "./admin/components/SavedHotels.jsx";
import SearchPage from "./pages/SearchPage.jsx";


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;



function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  // Function to set the isAdmin state
  const handleLogin = (isAdminValue) => {
    setIsAdmin(isAdminValue);
  };


  return (

    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/account/:subpage?" element={<AccountPage />}></Route>
          <Route path="/place/:id" element={<PlacePage />}></Route>
          <Route path="/search" element={<SearchPage/>}></Route>
        </Route>
        <Route path="/admin" element={<AdminLoginPage onLogin={handleLogin} />}></Route>
        {/* {isAdmin && ( */}
          <Route path="/admin/home" element={<Layout1 />}>
            <Route path="/admin/home" element={<Dashboard />}></Route>
            <Route path="/admin/home/add" element={<AddHotel />}></Route>
            <Route path="/admin/home/details" element={<BookingDetails />}></Route>
            <Route path="/admin/home/saved" element={<SavedHotels/>}></Route>
          </Route>
        {/* )} */}
      </Routes>
    </UserContextProvider>


  )
}

export default App

