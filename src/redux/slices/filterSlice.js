// Для создания slice импортируем createSlice
import { createSlice } from '@reduxjs/toolkit';

// обязательно нужно обозначить initialState, т.к он как в useState будет хранить изначальное значение
const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  // в reducers будем хранить actions (функции) которые будут воздействовать на изначальное значение, через state.
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

// экспортируем actions для их дальнейшего примения в компонентах
export const { setCategoryId, setSort } = filterSlice.actions;

// экспортируем по дефолту слайс.редюсер для его добавления в стор
export default filterSlice.reducer;
