import { FavoritesState } from './favorites.state';
import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite, updateNote } from './favorites.actions';
import { loadFavoritesFromLocalStorage } from './local-storage';

export const initialState: FavoritesState = loadFavoritesFromLocalStorage() || {
  favorites: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { card }) => {
    const updated = [...state.favorites, card];
    return { favorites: updated };
  }),
  on(removeFavorite, (state, { cardId }) => {
    const updated = state.favorites.filter((c) => c.id !== cardId);
    return { favorites: updated };
  }),
  on(updateNote, (state, { cardId, note }) => {
    const updated = state.favorites.map((card) =>
      card.id === cardId ? { ...card, notes: note } : card
    );
    return { favorites: updated };
  })
);
