import React, { useEffect, useState } from 'react'
import { Header, ProductCard, SideBar, SubSection } from '../components';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Product = () => {

    const [cartData, setCartData] = useState([]);
    const [currency, setCurrency] = useState("USD");
    const [sidebarShow, setSidebarShow] = useState(false);

    useEffect(() => {
        document.title = "Products - Lumin";
    })

    const addToCart = (id, title, image_url, price) => {
        if (!sidebarShow) setSidebarShow(true);
        let oldCartData = cartData;
        let newCartProduct;

        if (oldCartData.length > 0) {
            let existingCartData = oldCartData.find(element => element.id === id);
            if (existingCartData) {
                existingCartData.count = existingCartData.count + 1;
                setCartData([...oldCartData])
            } else {
                newCartProduct = {
                    id, title, image_url, price, count: 1
                }
                setCartData([...oldCartData, newCartProduct]);
            }
        }
        else {
            newCartProduct = {
                id, title, image_url, price, count: 1
            }
            setCartData([...oldCartData, newCartProduct]);
        }
    }

    const removeFromCart = (id) => {
        let currentCartData = cartData;

        let index = currentCartData.findIndex(element => element.id === id);

        if (currentCartData[index].count > 1) {
            currentCartData[index].count = currentCartData[index].count - 1;
            setCartData([...currentCartData])
        }
        else {
            currentCartData.splice(index, 1);
            setCartData([...currentCartData]);
        }
    }

    const closeOverlay = (e) => {
        e.preventDefault();
        if (e.target.id === "overlay" || e.target.innerHTML === "&gt;") {
            setSidebarShow(!sidebarShow);
        }
    }

    const reFormatCartData = async (data) => {
        setCartData([]); //trigger a re-render to update the full page

        let tempProductData = await data.products;
        let tempCartData = cartData;

        tempCartData.forEach((element, index) => {
            let newElement = tempProductData.find(item => item.id === element.id);
            tempCartData[index].price = newElement.price;
        });

        setCartData(tempCartData)
    }

    return (
        <>

            {/* header component */}
            <Header
                cartCount={cartData.length}
                setSidebarShow={setSidebarShow}
                key={Math.random()}
            />

            {/* sidebar  */}
            {
                sidebarShow ?
                    <SideBar
                        key={Math.random()}
                        cartData={cartData}
                        currency={currency}
                        addToCart={addToCart}
                        setCurrency={setCurrency}
                        closeOverlay={closeOverlay}
                        removeFromCart={removeFromCart}
                    />
                    :
                    <></>
            }

            {/* sub section */}
            <SubSection
                key={Math.random()}
            />

            <div id="productList">
                <div>
                    <Query
                        onCompleted={(data) => reFormatCartData(data)}
                        query={gql`
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
                                if (error) return <p> Please check your network and try again </p>;

                                return data.products.map(({ id, title, image_url, price }) => (
                                    <ProductCard
                                        id={id}
                                        title={title}
                                        image_url={image_url}
                                        price={price}
                                        addToCart={addToCart}
                                        key={id}
                                        currency={currency}
                                    />
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