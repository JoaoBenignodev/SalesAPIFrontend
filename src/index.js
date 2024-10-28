import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserSignUp from './pages/user/signup/UserSignUp';
import UserListAll from './pages/users/listAll/UserListAll';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/user-signup/' element={<UserSignUp/>}/>
        <Route path='/user-list-all/' element={<UserListAll/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
