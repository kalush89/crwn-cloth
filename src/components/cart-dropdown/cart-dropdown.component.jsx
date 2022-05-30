import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';

import {CartDropdownContainer, CartItemsStyle, EmptyMessage} from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/checkout';
        navigate(path);
    }

    return (
        <CartDropdownContainer>

           { cartItems.length > 0 ? (

           <CartItemsStyle>
           { cartItems.map((cartItem)=>(
                <CartItem key={cartItem.id} cartItem={cartItem} />
            )) }
            </CartItemsStyle>

            ):(

            <EmptyMessage>Your cart is empty</EmptyMessage>

            )}
            
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={routeChange} >CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;