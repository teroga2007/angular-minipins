import { Card } from '../models/card';

export interface FavoritesState {
  favorites: Card[];
}

export const initialFavoritesState: FavoritesState = {
  favorites: [],
};
