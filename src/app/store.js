import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from '../reducers/calendarReducer.js'

export default configureStore({
  reducer: {
    calendar: calendarReducer
  }
})