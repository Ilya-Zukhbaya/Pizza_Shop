import React from 'react';
import './scss/app.scss';

import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { FullPizza } from './pages/FullPizza';
import { MainLayout } from './layouts/MainLayout';

// Создаем контекст для того чтобы прокидывать значение без props-drilling и экспортируем его напрямую в компонент Search
export const SearchContext = React.createContext();

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
