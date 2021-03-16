export const setUser = (user) => ({
    type: 'SET_USER',
    user,
});

export const deleteUser = () => ({
    type: 'DELETE_USER',
});

export const setIsAdmin = (isAdmin) => ({
    type: 'SET_IS_ADMIN',
    isAdmin,
});