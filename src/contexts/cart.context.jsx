import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
// find if cartitems contains productToAdd
const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
);

// if found, increment quantity
if(existingCartItem) {
    return cartItems.map((cartItem) =>
    cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
    : cartItem
    );
};
// return new array with modified cartItems/ new cart item
return [...cartItems, { ...productToAdd, quantity: 1 }]
};


const subtractItemQuantity = (cartItems, itemToSubtract) => {
         // find if cartitems contains item
         const existingCartItem = cartItems.find(
            (cartItem) => cartItem.id === itemToSubtract.id
        );
        
        // if found and cart item quantity is 1, filter it out
        if(existingCartItem.quantity === 1) {
           return cartItems.filter(cartItem => cartItem.id !== itemToSubtract.id);
        }

        //else decrement cart item quantity by 1
        return cartItems.map((cartItem) =>
        cartItem.id === itemToSubtract.id ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
        );
    };

    const removeItem = (cartItems, itemToRemove) => {
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
    };




export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : () => {},
    cartItems: [],
    addItemToCart: () => {},
    subtractItemQuantity: () => {},
    removeCheckoutItem: () => {},
    cartCount: 0,
    totalCost: 0
    
});

export const  CartProvider = ({children}) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    
    

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems]);

    useEffect(()=>{
        const cartTotalCost = cartItems.reduce((total, cartItem) =>  total + cartItem.price * cartItem.quantity, 0);  
        setTotalCost(cartTotalCost);
    }, [cartItems]);

   
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd)); 
    }
    
    const subtractCheckoutItemQuantity = (itemToSubtractFrom) =>{
        setCartItems(subtractItemQuantity(cartItems, itemToSubtractFrom));
    }
    
    const removeCheckoutItem = (itemToRemove) =>{
         setCartItems(removeItem(cartItems, itemToRemove)); 
    }
    
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, subtractCheckoutItemQuantity, removeCheckoutItem, totalCost};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}