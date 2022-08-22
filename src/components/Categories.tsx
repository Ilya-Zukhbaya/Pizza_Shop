import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: any;
};

export const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  // Создаем массив для переключения между категориями и рендера массива categories
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          // ечли массив статичный, можно в кей передевать индекс элементов, если динамической - как в typeId
          <li
            // Теперь мы храним активный индекс в value
            className={value === index ? 'active' : ''}
            onClick={() => onChangeCategory(index)}
            key={index}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
