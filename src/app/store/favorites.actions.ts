import { createAction, props } from '@ngrx/store';
import { Card } from '../models/card';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ card: Card }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ cardId: string }>()
);

export const updateNote = createAction(
  '[Favorites] Update Note',
  props<{ cardId: string; note: string }>()
);
