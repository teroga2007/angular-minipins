import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  router = inject(Router);

  constructor(private searchService: SearchService) {}

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  loggedSrc =
    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
  unloggedSrc = 'https://placehold.co/50x50/FFFFFF/000000?text=No+User';

  get profilePhotoSrc() {
    if (!localStorage.getItem('user')) return this.unloggedSrc;
    return this.loggedSrc;
  }

  onSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value.trim();

    if (!inputValue) {
      this.searchService.clearQuery();
      return;
    }

    this.searchService.setQuery(inputValue);
  }
}
