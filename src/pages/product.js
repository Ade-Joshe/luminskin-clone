import React, { useState } from 'react'
import { Header, ProductCard, SubSection } from '../components';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Product = () => {

    const [cartData, setCartData] = useState([]);
    const [currency, setCurrency] = useState("USD");
    const [sidebarShow, setSidebarShow] = useState(false)

    const addToCart = (id, title, image_url, price) => {
        setSidebarShow(!sidebarShow);
        let oldCartData = cartData;
        let newCartProduct = {
            id, title, image_url, price
        }
        setCartData([...oldCartData, newCartProduct]);
        console.log(cartData)
    }

    const closeOverlay = (e) => {
        e.preventDefault();
        if (e.target.id === "overlay") {
            setSidebarShow(!sidebarShow);
        }
    }

    return (
        <>
            {
                sidebarShow ?
                    <div id="overlay" onClick={closeOverlay}>
                        <div className="contentBox">
                            <div className="flex">
                                <span>&gt;</span>
                                <p>YOUR CART</p>
                            </div>
                            <div>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <Query query={gql`
                                            {
                                                currency
                                            }
                                        `}>
                                        {
                                            ({ loading, error, data }) => {
                                                if (loading) return <option>loading ...</option>
                                                if (error) return <p> Error :( </p>;

                                                return data.currency.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ));
                                            }
                                        }
                                    </Query>
                                </select>
                            </div>
                            {
                                cartData.length > 0 ?
                                    <>

                                    </>
                                    :
                                    <p id={"noItemCart"}>There are no items in your cart.</p>
                            }
                        </div>
                    </div>
                    :
                    <>

                    </>
            }
            {/* header component */}
            <Header cartCount={cartData.length} setSidebarShow={setSidebarShow} />


            {/* sub section */}
            <SubSection />


            <div id="productList">
                <div>
                    <Query query={gql`
                        {
                            products {
                                id,
                                title,
                                image_url,
                                price(currency: ${currency})
                            }
                        }
                        `}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) return <p>loading ...</p>
                                if (error) return <p> Error :( </p>;

                                return data.products.map(({ id, title, image_url, price }) => (
                                    <ProductCard id={id} title={title} image_url={image_url} price={price} addToCart={addToCart} key={id} currency={currency} />
                                ));
                            }
                        }
                    </Query>
                </div>
            </div>

        </>
    )
}

export { Product }