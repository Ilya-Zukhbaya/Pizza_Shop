import React from 'react';
import './scss/app.scss';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';

function App() {
  // Сначала создаем стейт для того, чтобы получать туда данные из асинхроного бэка
  const [items, setItems] = React.useState([]);
  // Оборачиваем в юс эфеект, для того, чтобы не было множественных запросов из за перерисовки юз стейта, а всего один
  React.useEffect(() => {
    fetch('https://62ab87fba62365888bde013d.mockapi.io/items')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Здесь мы используем сэтАйтемс чтобы обновлять список пицц
        setItems(data);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>

          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {/* obj внутри метода мар, позволяет вытащить значения, которые хранятся в каждой пицце в json */}
            {items.map((obj) => (
              <PizzaBlock
                // Если мы уверены что названиния здешних параметров будет совпадать с теми, откуда мы их и достаем, до можно просто передать целый объект, а в пропсах вытаскивать значения (spread-оператор)
                {...obj}
                key={obj.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
