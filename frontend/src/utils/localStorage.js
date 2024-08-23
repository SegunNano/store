export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (favorites.some(p => p._id !== product._id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

export const removeFavoriteFromLocalStorage = () => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(product => product._id !== productId);

    localStorage.setItem('favorites', JSON.stringify(updateFavorites));

};

export const getFavoritesFromLocalStorage = () => {
    const favoriteJSON = localStorage.getItem('favorites');
    return favoriteJSON ? JSON.parse(favoriteJSON) : [];
};