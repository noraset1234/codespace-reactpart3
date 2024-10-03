import './Shop.css';
import { useState } from 'react';

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
    const products = [
        { id: 0, name: "Notebook Acer Swift", price: 45900, img: "https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg" },
        { id: 1, name: "Notebook Asus Vivo", price: 19900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg" },
        { id: 2, name: "Notebook Lenovo Ideapad", price: 32900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg" },
        { id: 3, name: "Notebook MSI Prestige", price: 54900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg" },
        { id: 4, name: "Notebook DELL XPS", price: 99900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg" },
        { id: 5, name: "Notebook HP Envy", price: 46900, img: "https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg" }
    ];

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
