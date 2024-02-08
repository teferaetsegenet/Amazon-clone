import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import Landing from './pages/Landing/Landing';
import Cart from './pages/Cart/Cart';
import Results from './pages/Results/Results';
import ProductDetail from './pages/ProductDetail/ProductDetail';

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/category/:categoryName' element={<Results />} />
                <Route path='/products/:productId' element={<ProductDetail />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
        </Router>
    );
}

export default Routing;
