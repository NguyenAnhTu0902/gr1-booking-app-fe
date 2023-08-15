import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage/HomePage';
import HotelItem from './pages/HotelItem/HotelItem';
import HotelList from './pages/HotelList/HotelList';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<HotelItem />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;