import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { Pagination } from '../Pagination';
import { SearchContext } from '../App';

import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';

export const Home = () => {
  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // достам из нашего слайса первоначальные значения через юсСелектор
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // Создаем функции для изменения изначальных значений через диспатч
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  // Сначала создаем стейт для того, чтобы получать туда данные из асинхроного бэка
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://62ab87fba62365888bde013d.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((response) => {
        // Здесь мы используем сэтАйтемс чтобы обновлять список пицц
        setItems(response.data);
        // После того, как мы перекинули пиццы с бэка в айтемс, можем изменить лоадинг на false
        setIsLoading(false);
      });
  };
  //  Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, pageCount]);

  //  Если был первый рендер, то проверяем юрл параметры и сохраняем их в редуксе
  React.useEffect(() => {
    if (
      window.location.search &&
      window.location.search !== '?sortProperty=rating&categoryId=0&pageCount=1'
    ) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, pageCount]);

  const pizzaz = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* obj внутри метода мар, позволяет вытащить значения, которые хранятся в каждой пицце в json */}
        {/* // Если мы уверены что названиния здешних параметров будет совпадать с теми, откуда мы их и достаем, до можно просто передать целый объект, а в пропсах вытаскивать значения (spread-оператор) */}
        {/* Если исЛоадинг = true, создаем фейк массив и подгружаем его, a если в items есть пиццы, то подгружаем их*/}
        {isLoading ? skeletons : pizzaz}
      </div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};
