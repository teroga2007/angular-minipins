// toast.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastData } from '../../services/toast.service';

@Component({
  selector: 'toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  @Input() toasts: ToastData[] = [];
}
