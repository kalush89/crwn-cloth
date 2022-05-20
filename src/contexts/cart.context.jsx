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

const addItemQuantity = (cartItems, itemId) => {
// find if cartitems contains item id
const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemId
);

// if found, increment quantity
if(existingCartItem) {
    return cartItems.map((cartItem) =>
    cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 }
    : cartItem
    );
}
// return new array with modified cartItems/ new cart item
return [...cartItems];
};

const subtractItemQuantity = (cartItems, itemId) => {
    // find if cartitems contains item id
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === itemId
    );
    
    // if found, decrement quantity
    if(existingCartItem && (existingCartItem.quantity >= 1)) {
        return cartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
        );
    }
    removeItem(cartItems, itemId);
    // return new array with modified quantity
    return [...cartItems];
    };

    const removeItem = (cartItems, itemId) => {
         // find if cartitems contains item
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === itemId
    );
    
    // if found, remove cart item
    if(existingCartItem) {
       // return cartItems.filter(cartItem => cartItem !== itemId);
        cartItems.map((cartItem, index) => {
        if(cartItem.id === itemId){
            return cartItems.splice(index, 1);
        }
           return cartItem;
    });

    }
    /*return cartItems.map((cartItem) =>
    cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
    );*/
    // return new array with modified cart items
    return [...cartItems];

};




export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : () => {},
    cartItems: [],
    addItemToCart: () => {},
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

    const addItemCheckoutQuant = (itemId) => {
        setCartItems(addItemQuantity(cartItems, itemId)); 
    }
    
    const reduceItemCheckoutQuant = (itemId) =>{
        setCartItems(subtractItemQuantity(cartItems, itemId));
    }
    
    const removeCheckoutItem = (itemId) =>{
        setCartItems(removeItem(cartItems, itemId)); 
    }
    
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, addItemCheckoutQuant, reduceItemCheckoutQuant, removeCheckoutItem, totalCost};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}