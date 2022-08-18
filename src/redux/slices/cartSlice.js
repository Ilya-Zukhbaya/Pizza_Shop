import { createSlice } from '@reduxjs/toolkit';

// обязательно нужно обозначить initialState, т.к он как в useState будет хранить изначальное значение
const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // в reducers будем хранить actions (функции) которые будут воздействовать на изначальное значение, через state.
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// экспортируем actions для их дальнейшего примения в компонентах
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

// экспортируем по дефолту слайс.редюсер для его добавления в стор
export default cartSlice.reducer;
