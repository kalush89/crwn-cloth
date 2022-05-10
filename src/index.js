import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './contexts/user.context';
import { ProductsProvider } from './contexts/products.context';
import { ItemCountProvider } from './contexts/item-count.context';
import { ToggleDropdownProvider } from './contexts/toggle-dropdown.context';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <ItemCountProvider>
            <ToggleDropdownProvider>
              <App />
            </ToggleDropdownProvider>
          </ItemCountProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
