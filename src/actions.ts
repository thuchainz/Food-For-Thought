export const loginUser = (payload: any) => {
    return {type: 'LOGIN_USER', payload}
}
export const updateUserList = (payload: any) => {
    return {type: 'UPDATE_USERS', payload}
}
export const addUser = (payload: any) => {
    return {type: 'ADD_USER', payload}
}
export const updateUserInfo = (payload: any) => {
    return {type: 'UPDATE_USER_INFO', payload}
}