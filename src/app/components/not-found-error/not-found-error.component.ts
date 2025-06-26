import { Component } from '@angular/core';
import { reloadPage } from '../../utils/shared';

@Component({
  selector: 'error-not-found',
  imports: [],
  templateUrl: './not-found-error.component.html',
})
export class NotFoundErrorComponent {
  reloadPage() {
    reloadPage();
  }
}
