import './Shop.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Item(props) {
    return (
        <div key={props.id} onClick={() => props.callback(props)}>
            <img src={props.img} width={200} height={200} /><br />
            id: {props.id} <br />
            name: {props.name}<br />
            price: {props.price}<br />
        </div>
    );
}

export default function Shop() {
    const [products,setProducts]=useState([]);
    const URL="https://improved-couscous-r44ggxg4qvqr356r4-5000.app.github.dev"
    useEffect(()=>{
        axios.get(URL+'/api/products')
        .then(response=>{
            setProducts(response.data);
        })
        .catch(error=>{
            console.log("error");
        })

    }
    ,[]);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    function addCart(item) {
        setCart([...cart, { id: item.id, name: item.name, price: item.price, img: item.img }]);
    }

    // Function to remove an item from the cart
    function removeCartItem(id) {
        setCart(cart.filter(item => item.id !== id));
    }

    // Function to reset the cart
    function resetCart() {
        setCart([]);
    }

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    // Filter products by search term
    const filteredProducts = products.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const productList = filteredProducts.map(item => (
        <Item {...item} key={item.id} callback={addCart} />
    ));
    
    const cartList = cart.map((item, index) => (
        <li key={index}>
            {item.name} - {item.price} THB 
            <button onClick={() => removeCartItem(item.id)}>Remove</button>
        </li>
    ));

    return (
        <>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className='grid-container'>{productList}</div>
            <h1>Cart</h1>
            <ol>{cartList}</ol>
            <h2>Total Price: {totalPrice} THB</h2>
            <button onClick={resetCart}>Reset Cart</button>
        </>
    );
}
