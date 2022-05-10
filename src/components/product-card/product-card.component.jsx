import { useContext } from 'react';

import Button from '../button/button.component';
import { ItemCountContext } from '../../contexts/item-count.context';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const {name, imageUrl, price} = product;
    const {count, setCount} = useContext(ItemCountContext);
    
    const handleClick = (e) =>{
        setCount(count + 1);
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={handleClick} >Add to cart</Button>
        </div>
    )
}

export default ProductCard;