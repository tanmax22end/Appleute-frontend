import React, { useState, useEffect } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';

function Cart() {

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = decode(token);
        const username = decodedToken.userId;
        console.log(username);

        axios.get(`http://localhost:4000/cart/user/${username}`)
            .then(response => {
                // update state with fetched data
                console.log(response.data);
                setCartProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching cart products:', error);
            });
    }, []);

    const handleBookNowClick = (product_name) => {
        const token = localStorage.getItem('token');
        const decodedToken = decode(token);
        const username = decodedToken.userId;
        console.log(username);

        axios
            .delete('http://localhost:4000/product/user/delete', {
                data: { username, product_name },
            }
            )
            .then((response) => {
                console.log(response.data);
                alert('successfuly booked');
                window.location.reload();
                // Navigate to a different page after the product is booked
            })
            .catch((error) => {
                console.error('Error booking product:', error);
            });
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', width: '100%' }}>
            <h2 style={{ marginBottom: '1rem' }}>Cart</h2>
            {cartProducts.map((product, index) => (
                <div key={index} style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <div>
                        <h3 style={{ marginBottom: '0.5rem' }}>{product.product_name}</h3>
                        <p style={{ marginBottom: '0.5rem' }}>{product.product_description}</p>
                    </div>
                    <button style={{ marginLeft: '1rem' }} onClick={() => handleBookNowClick(product.product_name)}>Book Now</button>
                </div>
            ))}
        </div>
    );
}

export default Cart;