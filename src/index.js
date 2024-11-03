import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Adduser from './pages/user/signup/addUser';
import UserListAll from './pages/users/listAll/UserListAll';
import AddProduct from './pages/product/addProduct/addProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/user/add/' element={<Adduser/>}/>
        <Route path='/product/add/' element={<AddProduct/>}/>
        <Route path='/user-list-all/' element={<UserListAll/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
