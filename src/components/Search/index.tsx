import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  // Создаем стейт, для того, чтобы локально хранить значения поиска и не мешать глобальному поиску, который отправляется на бэк
  const [value, setValue] = React.useState('');
  // Хук useCallback работает примерно как useContext, зависимости будут в массиве, и  от них зависит, как будет работать функция внутри
  const updateSearchValue = React.useCallback(
    // через дебоунс задаем задержку в 750 милисек. перед тем, как мы будем отправлять данные на бэк
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 750),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
        <title />
        <g data-name="1" id="_1">
          <path d="M221.12,389.43A173.22,173.22,0,0,1,98.25,338.61c-67.75-67.75-67.75-178,0-245.74s178-67.75,245.74,0A173.69,173.69,0,0,1,221.12,389.43Zm0-317.39a143.37,143.37,0,0,0-101.66,42c-56,56.06-56,147.26,0,203.32A143.77,143.77,0,1,0,322.78,114.08h0A143.35,143.35,0,0,0,221.12,72Z" />
          <path d="M221.12,332.16a116.42,116.42,0,1,1,82.36-34.06A116.1,116.1,0,0,1,221.12,332.16Zm0-202.86a86.44,86.44,0,1,0,61.15,25.29A86.22,86.22,0,0,0,221.12,129.3Z" />
          <path d="M414.82,450.44a40.78,40.78,0,0,1-29-12L302.89,355.5a15,15,0,0,1,21.22-21.22L407,417.21a11,11,0,1,0,15.55-15.55l-82.93-82.93a15,15,0,1,1,21.22-21.22l82.93,82.93a41,41,0,0,1-29,70Z" />
        </g>
      </svg>
      <input
        value={value}
        type="search"
        placeholder="Поиск пиццы..."
        className={styles.input}
        // Для того, чтобы получать значения из Контролируемого инпута, мы используем таргет вэлью и это значаение помещаем в нам стейт
        onChange={onChangeInput}
      />
    </div>
  );
};
