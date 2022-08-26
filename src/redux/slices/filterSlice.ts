// Для создания slice импортируем createSlice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  pageCount: number;
  searchValue: string;
}

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

// обязательно нужно обозначить initialState, т.к он как в useState будет хранить изначальное значение
const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  pageCount: 1,
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  // в reducers будем хранить actions (функции) которые будут воздействовать на изначальное значение, через state.
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.pageCount = Number(action.payload.pageCount);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

// экспортируем actions для их дальнейшего примения в компонентах
export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } =
  filterSlice.actions;

// экспортируем по дефолту слайс.редюсер для его добавления в стор
export default filterSlice.reducer;
