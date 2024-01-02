import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './feature/user'
const initialState = {
  sidebarShow: true,
}



const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

//const store = createStore(changeState);
export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    // comments: commentsReducer,
    users: usersReducer,
  },
})
export default store
