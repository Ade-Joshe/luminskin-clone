import React from 'react'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const CurrencySelector = ({ currency, setCurrency }) => {
    return (
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
                        if (error) return <p> Error loading currencies </p>;

                        return data.currency.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ));
                    }
                }
            </Query>
        </select>
    )
}

export { CurrencySelector }