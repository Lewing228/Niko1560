// App.js
import './App.css';
import FoodCard from "./components/Card/foodCard";
import burgerImage from './images/burger.png';
import poke from './images/poke.png';
import salad from './images/salad.png';
import soap from './images/soap.png';
import meat from './images/meat.png';
import toast from './images/toast.png';
import logo from './images/logo.png';
import React from "react";
import { Link, Route, Navigate, Routes, useLocation } from "react-router-dom";
import Navbar from './components/Navbar/navbar';
import CartPage from "./components/cartPage/CartPage";
import { useCart } from './components/cartPage/CartContext';
import Product from "./components/Product/Product";

function App() {
    const { addToCart, cartItems } = useCart();
    const location = useLocation();

    const cards = [
        { id: 1, name: "Чизбургер", weight: "310 г", description:"Котлета, булка, помидор, лук", price: "430", imageUrl: burgerImage },
        { id: 2, name: "Цезарь с курицей", weight: "190 г",description:"Льстья салата, курица, помидор, яйцо",  price: "230", imageUrl: salad },
        { id: 3, name: "Сырный крем-суп", weight: "220 г",description:"Сыр, крем, суп",  price: "440", imageUrl: soap },
        { id: 4, name: "Поке с лососем", weight: "270 г",description:"Помидоры, кукуруза, дольки лосося, капуста",  price: "380", imageUrl: poke },
        { id: 5, name: "Ассорти из шашлыка", weight: "450 г",description:"Баранина, утка, антрекот, свинина",  price: "930", imageUrl: meat },
        { id: 6, name: "Тосты", weight: "190 г",description:"Голубика, банан, тосты",  price: "220", imageUrl: toast },
    ];
    const shouldShowHeaderAndNavbar = !['/cart', '/product'].some(path => location.pathname.startsWith(path));
    return (
        <div className="App">
            {shouldShowHeaderAndNavbar &&(
                <>
                    <div className="block_header">
                        <div className="left-placeholder"></div>
                        <img className="logo" src={logo} alt="Logo" />
                        <div className="block_basket">
                            <Link to="/cart">
                                <svg width="30" height="30" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.6666 19.6666L19.6666 17.2083C19.6666 11.7775 24.0692 7.37496 29.5 7.37496V7.37496C34.9308 7.37496 39.3333 11.7775 39.3333 17.2083L39.3333 19.6666" stroke="#D9C77C" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M36.875 34.4167V29.5" stroke="#D9C77C" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M22.125 34.4167V29.5" stroke="#D9C77C" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M9.83337 23.6666C9.83337 21.781 9.83337 20.8382 10.4192 20.2524C11.0049 19.6666 11.9478 19.6666 13.8334 19.6666H45.1667C47.0523 19.6666 47.9951 19.6666 48.5809 20.2524C49.1667 20.8382 49.1667 21.781 49.1667 23.6666V43.625C49.1667 47.3962 49.1667 49.2818 47.9951 50.4534C46.8236 51.625 44.9379 51.625 41.1667 51.625H17.8334C14.0621 51.625 12.1765 51.625 11.0049 50.4534C9.83337 49.2818 9.83337 47.3962 9.83337 43.625V23.6666Z" stroke="#D9C77C" strokeWidth="1.5" />
                                </svg>
                                {cartItems.length > 0 && (
                                    <div className="cart-quantity">
                                        {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                    </div>
                                )}
                            </Link>
                        </div>
                    </div>
                    <Navbar />
                </>
            )}
            <Routes >
                <Route path="/" element={
                    <div className="card-container">
                        {cards.map(card => (
                            <FoodCard
                                key={card.id}
                                id={card.id}
                                name={card.name}
                                weight={card.weight}
                                price={card.price}
                                imageUrl={card.imageUrl}
                                onAddToCart={() => addToCart(card)}
                            />
                        ))}
                    </div>
                } />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
