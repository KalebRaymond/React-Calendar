import { createSlice } from '@reduxjs/toolkit'

export const calendarReducer = createSlice({
    name: 'calendar',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        testReducerMethod: (state) => {
            console.log('### REDUX WORKS', state.value);
        }
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, testReducerMethod } = calendarReducer.actions

export default calendarReducer.reducer