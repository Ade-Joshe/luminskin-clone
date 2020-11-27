import React from 'react'
import { Header, SubSection } from '../components';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Product = () => {

    return (
        <>
            {/* header component */}
            <Header />

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
                                price(currency: USD)
                            }
                        }
                        `}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) return <p>loading ...</p>
                                if (error) return <p> Error :( </p>;

                                return data.products.map(({ id, title, image_url, price }) => (
                                    <div className="product" key={id}>
                                        <img src={image_url} alt={`${title}`} />
                                        <h4>{title}</h4>
                                        <p>From ${price}</p>
                                        <button>Add to Cart</button>
                                    </div>
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