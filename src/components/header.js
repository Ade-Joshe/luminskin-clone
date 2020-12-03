import React from 'react';
import { logo, cartIcon } from '../assets';

const Header = ({ cartCount, setSidebarShow }) => {
    return (
        <header className="flex">
            <img src={logo} alt="logo" />
            <p>Shop</p>
            <p>Help</p>
            <p>Blog</p>

            <div className="flex">
                <p>Account</p>
                <p onClick={() => setSidebarShow(true)}><img src={cartIcon} alt="Cart icon" /> {cartCount}</p>
            </div>
        </header>
    )
}

export { Header }