import { useNavigate } from 'react-router-dom';

import {DirctoryItemContainer, BackgroundImage, DirectoryBodyContainer} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const handleNavigation = () => navigate(route);
    return (
        <DirctoryItemContainer onClick={handleNavigation}>
            <BackgroundImage imageUrl={imageUrl} />
            <DirectoryBodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryBodyContainer>
        </DirctoryItemContainer>
    );
};

export default DirectoryItem;