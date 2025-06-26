// store/meta-reducers.ts
import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { saveFavoritesToLocalStorage } from './local-storage';

export function localStorageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);

    if (action.type !== INIT && action.type !== UPDATE) {
      saveFavoritesToLocalStorage(nextState.favorites);
    }

    return nextState;
  };
}
