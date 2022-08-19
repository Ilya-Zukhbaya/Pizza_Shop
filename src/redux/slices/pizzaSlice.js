// Для создания slice импортируем createSlice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, search, pageCount } = params;
  const { data } = await axios.get(
    `https://62ab87fba62365888bde013d.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

// обязательно нужно обозначить initialState, т.к он как в useState будет хранить изначальное значение
const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  // в reducers будем хранить actions (функции) которые будут воздействовать на изначальное значение, через state.
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

// экспортируем по дефолту слайс.редюсер для его добавления в стор
export default pizzaSlice.reducer;
