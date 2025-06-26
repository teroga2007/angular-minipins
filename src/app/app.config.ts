import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { favoritesReducer } from './store/favorites.reducer';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageMetaReducer } from './store/meta-reducers';
import { loadFavoritesFromLocalStorage } from './store/local-storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      { favorites: favoritesReducer },
      {
        metaReducers: [localStorageMetaReducer],
        initialState: {
          favorites: loadFavoritesFromLocalStorage() || { favorites: [] },
        },
      }
    ),
    provideStoreDevtools(),
  ],
};
