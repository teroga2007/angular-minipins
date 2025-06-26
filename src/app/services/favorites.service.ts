import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { isFavorite } from '../store/favorites.selectors';
import { Card } from '../models/card';
import { addFavorite, removeFavorite } from '../store/favorites.actions';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private store: Store) {}

  toggleFavorite(image: Card): Promise<boolean> {
    return firstValueFrom(this.store.select(isFavorite, { id: image.id })).then(
      (isFav) => {
        if (isFav) {
          this.store.dispatch(removeFavorite({ cardId: image.id }));
          return false;
        } else {
          this.store.dispatch(addFavorite({ card: image }));
          return true;
        }
      }
    );
  }
}
