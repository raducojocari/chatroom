export const loginUser = (user) => {
    console.log('loginaction', user)
    return {
        type: "LOGIN_USER",
        payload: user
    };
};
