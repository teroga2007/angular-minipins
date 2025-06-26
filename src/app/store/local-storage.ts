import { FavoritesState } from './favorites.state';

export const loadFavoritesFromLocalStorage = (): FavoritesState | undefined => {
  try {
    const serialized = localStorage.getItem('favorites');
    if (!serialized) return undefined;

    const parsed = JSON.parse(serialized);

    if (parsed && Array.isArray(parsed.favorites)) {
      return parsed;
    }

    return undefined;
  } catch (e) {
    return undefined;
  }
};

export const saveFavoritesToLocalStorage = (state: FavoritesState) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(state));
  } catch (e) {
    console.warn('Error saving favorites to local storage', e);
  }
};
