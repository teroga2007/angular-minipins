import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';
import { Card } from '../models/card';

export const selectFavoritesState =
  createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state): Card[] => state.favorites
);
export const isFavorite = createSelector(
  selectFavoritesState,
  (state: FavoritesState, props: { id: string }) =>
    Array.isArray(state.favorites) &&
    state.favorites.some((card) => card.id === props.id)
);
