import React from 'react';
import { logo, cartIcon } from '../assets';

const Header = () => {
    return (
        <header className="flex">
            <img src={logo} alt="logo" />
            <p>Shop</p>
            <p>Learn</p>

            <div className="flex">
                <p>Account</p>
                <p><img src={cartIcon} alt="Cart icon" /> 4</p>
            </div>

        </header>
    )
}

export { Header }