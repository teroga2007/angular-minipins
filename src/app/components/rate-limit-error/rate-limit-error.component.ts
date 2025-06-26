import { Component } from '@angular/core';
import { reloadPage } from '../../utils/shared';

@Component({
  selector: 'error-rate-limit',
  imports: [],
  templateUrl: './rate-limit-error.component.html',
})
export class RateLimitErrorComponent {
  reloadPage() {
    reloadPage();
  }
}
