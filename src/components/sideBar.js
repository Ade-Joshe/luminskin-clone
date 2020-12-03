import React, { useEffect, useMemo, useState } from 'react'
import { CartCard } from './cartCard';
import { CurrencySelector } from './currencySelector';

const SideBar = ({ closeOverlay, currency, setCurrency, cartData, addToCart, removeFromCart }) => {

    const [data, setData] = useState(cartData);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setData(cartData);
        totalAmount(cartData);
    }, [cartData]);

    const totalAmount = (array) => {
        setTotal(array.reduce((acc, value) => acc +
            (value.price * value.count), 0
        ));
    }

    return useMemo(() => (
        <div id="overlay" onClick={closeOverlay}>
            <div className="contentBox">

                <div className="flex">
                    <p><span>&gt;</span></p>
                    <p>YOUR CART</p>
                    <p />
                </div>

                <div>
                    <CurrencySelector currency={currency} setCurrency={setCurrency} key={Math.random()} />
                </div>

                <div className="cartList">
                    {
                        data.length > 0 ?
                            data.map(({ id, title, count, image_url, price }, index) =>
                                <CartCard
                                    id={id}
                                    key={Math.random() * index}
                                    title={title}
                                    price={price}
                                    count={count}
                                    currency={currency}
                                    addToCart={addToCart}
                                    image_url={image_url}
                                    removeFromCart={removeFromCart}
                                />
                            )
                            :
                            <p id={"noItemCart"}>There are no items in your cart.</p>
                    }
                </div>

                {
                    data.length > 0 ?
                        <div id="checkout">
                            <div className="flex space-between">
                                <p>SubTotal</p>
                                <p>{currency}  {total}.00</p>
                            </div>
                            <button>MAKE THIS A SUBSCRIPTION (SAVE 20%)</button>
                            <button>PROCEED TO CHECKOUT</button>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    ), data)
}

export { SideBar }