import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AddUser from './pages/user/registering/addUser';
import Users from './pages/user/listing/users';
import AddProduct from './pages/product/registering/addProduct';
import Products from './pages/product/listing/products';
import AddSale from './pages/sale/registering/addSale';
import Sales from './pages/sale/listing/sales';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/users/add/" element={<AddUser />} />
                <Route path="/users/" element={<Users />} />
                <Route path="/products/add/" element={<AddProduct />} />
                <Route path="/products/" element={<Products />} />
                <Route path="/sales/add/" element={<AddSale />} />
                <Route path="/sales/" element={<Sales />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
