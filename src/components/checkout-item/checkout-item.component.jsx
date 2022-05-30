import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Arrow, Value, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const {imageUrl, name, price, quantity} = cartItem;

    const { addItemToCart, subtractCheckoutItemQuantity, removeCheckoutItem } = useContext(CartContext);

    const addQuantity = () => addItemToCart(cartItem);

    const reduceQuantity = () => subtractCheckoutItemQuantity(cartItem);

    const removeItem = () => removeCheckoutItem(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer src={imageUrl} alt={`${name}`} />
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={reduceQuantity}>&#10094; </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addQuantity}> &#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={removeItem}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;