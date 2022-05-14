import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutAuthUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";

import './navigation.styles.scss';

const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen, setIsCartOpen} = useContext(CartContext);
  
    return(
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <CrwnLogo className="logo" />
          </Link>
          
          <div className="nav-links-container">
              <Link className="nav-link" to="/shop">
                SHOP
              </Link>
              {currentUser ? (
                <span className="nav-link" onClick={signOutAuthUser}>SIGN OUT</span>
              ) : (
                <Link className="nav-link" to="/auth">
                  SIGN IN
                </Link>
              )}
              <span className="nav-link" >
              <CartIcon />
              </span>
                
          </div>
          {isCartOpen  && <CartDropdown />}
          
        </div>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;