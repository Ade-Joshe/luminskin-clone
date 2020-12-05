import React, { useEffect } from 'react'

const CartCard = ({ id, title, count, image_url, currency, price, addToCart, removeFromCart }) => {

    useEffect(() => {
    }, [id, count, price])

    const increaseCount = () => {
        addToCart(id, title, image_url, price);
    }

    const decreaseCount = () => {
        removeFromCart(id);
    }

    return (
        <div className="cartItem">
            <h2>{title}</h2>
            <div className="flex">
                <div id="controls">
                    <button onClick={decreaseCount}>-</button>
                    {count}
                    <button onClick={increaseCount}>+</button>
                </div>

                {currency + " " + price + ".00"}
                <img src={image_url} alt={title} />
            </div>
        </div>
    )
}

export { CartCard }