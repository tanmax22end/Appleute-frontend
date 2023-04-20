import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';

import withAuth from './withAuth';

function User() {

    const [widgets, setWidgets] = useState([]);
    const [name, setName] = useState("Tanmay Singh");

    useEffect(() => {
        // make API call to fetch widgets data
        const token = localStorage.getItem('token');
        const decodedToken = decode(token);
        const username = decodedToken.userId;
        setName(username);
        axios.get('http://localhost:4000/get/products')
            .then(response => {
                // update state with fetched data
                setWidgets(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleAddToCart = (product) => {
        const token = localStorage.getItem('token');
        const decodedToken = decode(token);
        const username = decodedToken.userId;
        axios.post('http://localhost:4000/product/user', { username, products: product })
            .then(response => {
                console.log("Product added to cart:", response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
        <nav style={{ backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
            <div>My App</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '1rem' }}>{name}</div>
                    <Link to="/cart">
                        <FaShoppingCart size={20} />
                    </Link>
                </div>
            </nav>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', width: '100%' }}>
                <h2>Mobiles</h2>
                <div style={{ display: 'flex', overflowX: 'auto', padding: '1rem' }}>
                    {widgets.filter(widget => widget.category === 'Mobiles').map(widget => (
                        <div
                            key={widget.product_name}
                            style={{
                                minWidth: '200px',
                                marginRight: '1rem',
                                padding: '1rem',
                                borderRadius: '5px',
                                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                            }}
                        >
                            <h2>{widget.product_name}</h2>
                            <p>{widget.product_description}</p>
                            <button onClick={() => handleAddToCart(widget)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default withAuth(User);