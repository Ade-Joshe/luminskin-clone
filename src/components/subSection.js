import React from 'react'

const SubSection = () => {
    return (
        <section className="subsection">
            <div>
                <div>
                    <h2>All Products</h2>
                    <p>A 360° look at Lumin</p>
                </div>
                <div>
                    <select>
                        <option>Filter by</option>
                        <option>Price</option>
                        <option>Faction</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

export { SubSection }