const initState = {
  username: ''
}

export default function loginReducer(state = initState, action) {
    if (action.type ==="LOGIN_USER") {
      console.log('loginReducer:', state, action.payload)
            return {
                ...state,
                username: action.payload
            };
    }
    return state;
};
