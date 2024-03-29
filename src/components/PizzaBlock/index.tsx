import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, CartItem, selectCartItemById } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  // Передаем в sizes - массив из массива пицц, который содержит информацию о том, в каким размерах может бюыть пицца
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const typeNames = ['тонкое', 'традиционное'];
  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem ? cartItem.count : 0;

  // Здесь хранится массив для определения типа пиццы и стейт для их переключения
  const [activeType, setActiveType] = React.useState<number>(0);

  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt={`Пицца: ${title}`} />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {/* С помощью мар рендерим массив из типов теста пицц */}
            {types.map((typeId, index) => (
              <li
                className={activeType === index ? 'active' : ''}
                key={typeId}
                onClick={() => setActiveType(index)}>
                {/* Здесь, мы берем массив typeNames и внутри него помещаем значения 0 и 1 то есть typeId, сначала typeNames[0], [1] и так далее перебирая элементы*/}
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {/* С помощью мар рендерим массив из sizes */}
            {sizes.map((size, index) => (
              <li
                className={activeSize === index ? 'active' : ''}
                key={index}
                onClick={() => setActiveSize(index)}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
