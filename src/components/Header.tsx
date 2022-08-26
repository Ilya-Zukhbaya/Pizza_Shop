import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from './Search';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/slices/cartSlice';

import cartLogo from '../assets/img/cartLogo.svg';

export function Header() {
  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();
  const isMounted = React.useRef(false);

  const totalCount: number = items.reduce(
    (
      sum: number,
      item: {
        count: number;
      },
    ) => sum + item.count,
    0,
  );

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="60" src="./myAvatar.ico" alt="Pizza logo" />
            <div>
              <h1>Pizza Market</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          {location.pathname !== '/cart' && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <img src={cartLogo} alt="cart-logo" className="header__cartLogo" />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
