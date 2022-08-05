import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';

// Создаем стор, для этого импортируем configureStore.
export const store = configureStore({
  // reducer будем отвечать за хранение отдельных slices;
  reducer: {
    filter,
  },
});
