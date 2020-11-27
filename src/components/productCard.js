import React from 'react'

const ProductCard = ({ id, image_url, title, price, addToCart, currency }) => {
    return (
        <div className="product">
            <img src={image_url} alt={`${title}`} />
            <h4>{title}</h4>
            <p>From {currency} {price}</p>
            <button onClick={() => addToCart(id, title, image_url, price)}>Add to Cart</button>
        </div>
    )
}

export { ProductCard }
