import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../models/card';
import { UnsplashService } from '../../services/unsplash.service';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { ToastData, ToastService } from '../../services/toast.service';
import { ToastComponent } from '../../components/toast/toast.component';
import { isFavorite } from '../../store/favorites.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-image-detail',
  imports: [CommonModule, ToastComponent],
  templateUrl: './image-detail.component.html',
})
export class ImageDetailComponent implements OnInit {
  imageId: string = '';
  image!: Card;
  toast: ToastData[] = [];
  isFavorite: boolean = false;
  notes: string | null = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private service: UnsplashService,
    private router: Router,
    private favoritesService: FavoritesService,
    private toastService: ToastService,
    private store: Store
  ) {}
  getNotesFromLocalStorage(imageId: string): string | null {
    const favoritesRaw = localStorage.getItem('favorites');
    if (!favoritesRaw) return null;

    try {
      const parsed = Object.values(JSON.parse(favoritesRaw));
      const cards = Array.isArray(parsed[0]) ? parsed[0] : [];

      const match = cards.find((card: Card) => card.id === imageId);
      return match?.notes || null;
    } catch (e) {
      console.error('Error parsing favorites from localStorage:', e);
      return null;
    }
  }

  ngOnInit(): void {
    this.imageId = this.activeRoute.snapshot.paramMap.get('id') || '';

    this.service.getImageById(this.imageId).subscribe((res) => {
      this.image = res;

      this.store
        .select(isFavorite, { id: this.image.id })
        .subscribe((isFav) => {
          this.isFavorite = isFav;
        });

      this.notes = this.getNotesFromLocalStorage(this.imageId);
      if (this.notes) {
        console.log('Notas:', this.notes);
      }
    });

    this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onToggleFavorite(event: Event) {
    event.stopPropagation();

    this.favoritesService.toggleFavorite(this.image).then((wasAdded) => {
      if (wasAdded) {
        this.toastService.showToast('Added to favorites', 'success');
      } else {
        this.toastService.showToast('Removed from favorites', 'error');
      }
    });
  }
}
