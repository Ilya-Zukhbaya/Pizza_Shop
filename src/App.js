import React from 'react';
import './scss/app.scss';

import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

// Создаем контекст для того чтобы прокидывать значение без props-drilling и экспортируем его напрямую в компонент Search
export const SearchContext = React.createContext();

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* если ни один из этих роутов не подошел, рендерим нот фаунд */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
