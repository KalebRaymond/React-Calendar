import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

export const calendarReducer = createSlice({
    name: 'calendar',
    initialState: {
        focusedDate: moment(),
        testValue: 0
    },
    reducers: {
        incrementMonth: state => {
            state.focusedDate.add(1, 'month');
        },
        decrementMonth: state => {
            state.focusedDate.subtract(1, 'month');
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementMonth, decrementMonth } = calendarReducer.actions

export default calendarReducer.reducer