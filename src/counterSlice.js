import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter12221',
  initialState: {
    value: 0,
    text: '',
    k8json: {},
    selectedK8Key: ''
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
    },
    setK8json: (state, action) => {
      state.k8json = action.payload
    },
    setK8JsonContent: (state, action) => {
      state.k8json[action.payload.key].apiVersion = action.payload.value;
    },
    setK8Key: (state, action) => {
      state.selectedK8Key = action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount, setDescription, setK8json, setK8Key, setK8JsonContent } = counterSlice.actions


// export const selectCount = (state) => state.counter.value


export const selectDescription = (state) => state.counter.text
export const selectedK8Key = (state) => state.counter.selectedK8Key
export const selectK8json = (state) => state.counter.k8json

export default counterSlice.reducer