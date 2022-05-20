import { useContext, useEffect } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem : {id, imageUrl, name, price, quantity}}) => {
   const { addItemCheckoutQuant, reduceItemCheckoutQuant, removeCheckoutItem } = useContext(CartContext);

    const addQuantity = () => addItemCheckoutQuant(id);
    

    const reduceQuantity = () => reduceItemCheckoutQuant(id);

    const removeItem = () => removeCheckoutItem(id);

    return (
        <div className='checkout-item-container'>
            <img className='image-container' src={imageUrl} alt={`${name}`} />
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={reduceQuantity}>&#10094; </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addQuantity}> &#10095;</div>
                </span>
            <div className='price'>{price}</div>
            <div className='remove-button' onClick={removeItem}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;