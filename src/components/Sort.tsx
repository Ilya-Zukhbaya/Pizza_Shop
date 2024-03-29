import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort, SortPropertyEnum } from '../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const sortList: SortItem[] = [
  { name: 'популярности (уб)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (возр)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (уб)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (возр)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (уб)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (возр)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

export function SortPopup() {
  // прописываем хук useDispatch в константу, для того, чтобы использовать его для изменения изначального состояния, прописанного в слайсе
  const dispatch = useDispatch();
  // хук useSelector отвечает за вытаскивание значения из слайса, примерно как useSelector
  const sort = useSelector(selectSort);
  const [open, setOpen] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  // Сначала мы выбираем в попапе определемнную категорую, а затем передаем false в open
  const onClickListItem = (obj: SortItem) => {
    // action setSort меняет объект {name: '', sortProperty: ''}
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {/* Условный рендеринг, если слева false правая часть скрыта */}
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                key={i}
                // При клике на obj, мы записываем значение текущего obj в slice (sort)
                onClick={() => onClickListItem(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
