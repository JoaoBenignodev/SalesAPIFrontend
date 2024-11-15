import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Adduser from './pages/user/signup/addUser';
import Products from "./pages/product/products";
import UserListAll from './pages/users/listAll/UserListAll';
import SaleListAll from './pages/sales/listAll/SaleListAll';
import AddProduct from './pages/product/addProduct/addProduct';
import AddSale from './pages/sales/addSale/addSale';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/user/add/" element={<Adduser />} />
                <Route path="/product/add/" element={<AddProduct />} />
                <Route path="/sale/add/" element={<AddSale />} />
                <Route path="/products/" element={<Products />} />
                <Route path="/user-list-all/" element={<UserListAll />} />
                <Route path="/sale-list/" element={<SaleListAll />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
