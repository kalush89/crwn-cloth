import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/checkout';
        navigate(path);
    }

    return (
        <div className='cart-dropdown-container'>

           { cartItems.length > 0 ? (

           <div className='cart-items'>
           { cartItems.map((cartItem)=>(
                <CartItem key={cartItem.id} cartItem={cartItem} />
            )) }
            </div>

            ):(

            <div className='empty-message'>Your cart is empty</div>

            )}
            
            <Button buttonType='inverted' onClick={routeChange} >CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;