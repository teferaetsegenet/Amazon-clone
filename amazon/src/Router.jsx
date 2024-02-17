import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import Landing from './pages/Landing/Landing';
import Cart from './pages/Cart/Cart';
import Results from './pages/Results/Results';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Auth from './pages/Auth/Auth';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51OkKG4HM2ocMcGVoRiyVYkfsWqalU5MXXIt26PUY63V3m8bz6QQ6du3H3N5LyhI3QOjXUr3WKgN2Torgy8Tbrk5000f3nN8VtJ");



function Routing() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/payments' element={
                <Elements stripe={stripePromise}>
                    <Payment />
                    </Elements>
                } />
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
