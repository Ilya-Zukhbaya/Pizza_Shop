import React from 'react';

export function Categories() {
  // Переключение между категориями пицц
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  // Создаем массив для переключения между категориями и рендера массива categories
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            className={activeIndex === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}
            key={index}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
