import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CryptoItem from './pages/CryptoItem'
import Home from './pages/Home';

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/:id' element={<CryptoItem/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes