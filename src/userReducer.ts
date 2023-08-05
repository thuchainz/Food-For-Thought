const initialState = { 
  isLoggedIn: false,
  currentUser: "None",
  userInfo: {},
  users: {} 
}

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, isLoggedIn: true, currentUser: action.payload.username, userInfo: action.payload.userInfo }
    case 'UPDATE_USER_INFO':
      return { ...state, userInfo: action.payload}
    case 'ADD_USER':
      return { ...state, users: Object.assign({}, state.users, action.payload)}
    case 'UPDATE_USERS':
      return { ...state, users: action.payload}
    default:
      return state
  }
}
