import { createSlice } from '@reduxjs/toolkit'
const ss = require('@reduxjs/toolkit')

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    text: ''
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value = action.payload
    },
    setDescription: (state, action) => {
      state.text = action.payload
    }
  },
})

export const { increment, decrement, incrementByAmount, setDescription } = counterSlice.actions
export const selectCount = (state) => state.counter.value
export const selectDescription = (state) => state.counter.text
console.log('counterSlice: ', counterSlice);
export default counterSlice.reducer