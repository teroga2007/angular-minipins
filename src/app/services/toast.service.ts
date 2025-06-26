// toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = new BehaviorSubject<ToastData[]>([]);
  public readonly toast$ = this._toasts.asObservable();

  private counter = 0;

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const newToast: ToastData = {
      message,
      type,
      id: this.counter++, // unique id for each toast
    };

    const currentToasts = this._toasts.getValue();
    this._toasts.next([...currentToasts, newToast]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => this.dismissToast(newToast.id), 3000);
  }

  dismissToast(id: number) {
    const currentToasts = this._toasts.getValue();
    this._toasts.next(currentToasts.filter((t) => t.id !== id));
  }
}
