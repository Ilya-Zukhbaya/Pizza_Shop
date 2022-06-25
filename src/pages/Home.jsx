import React from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  // Сначала создаем стейт для того, чтобы получать туда данные из асинхроного бэка
  const [items, setItems] = React.useState([]);
  // Создвем стейты сортировки и категорий для того, чтобы прокинуть их в <Category и Sort />
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  // Оборачиваем в юс эфеект, для того, чтобы не было множественных запросов из за перерисовки юз стейта, а всего один
  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    fetch(
      `https://62ab87fba62365888bde013d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Здесь мы используем сэтАйтемс чтобы обновлять список пицц
        setItems(data);
        // После того, как мы перекинули пиццы с бэка в айтемс, можем изменить лоадинг на false
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* obj внутри метода мар, позволяет вытащить значения, которые хранятся в каждой пицце в json */}
        {/* // Если мы уверены что названиния здешних параметров будет совпадать с теми, откуда мы их и достаем, до можно просто передать целый объект, а в пропсах вытаскивать значения (spread-оператор) */}
        {/* Если исЛоадинг = true, создаем фейк массив и подгружаем его, a если в items есть пиццы, то подгружаем их*/}
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </div>
  );
};
