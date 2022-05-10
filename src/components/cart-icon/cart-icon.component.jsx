import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { ItemCountContext } from '../../contexts/item-count.context';
import { ToggleDropdownContext } from '../../contexts/toggle-dropdown.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const {count} = useContext(ItemCountContext);
    const {dropdown, setDropdown} = useContext(ToggleDropdownContext);

    const toggleDropdown = () => setDropdown(!dropdown);
   
    return (
        <div className='cart-icon-container' onClick={toggleDropdown}>
            <ShoppingIcon className='shopping-icon' /> 
            <span className='item-count'>{count}</span>
        </div>
    )
}

export default CartIcon;