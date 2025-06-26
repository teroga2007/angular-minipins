import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UnsplashService } from '../../services/unsplash.service';
import { Card } from '../../models/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { RateLimitErrorComponent } from '../../components/rate-limit-error/rate-limit-error.component';
import { NotFoundErrorComponent } from '../../components/not-found-error/not-found-error.component';
import { SearchService } from '../../services/search.service';
import { ToastData, ToastService } from '../../services/toast.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'homepage',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    RateLimitErrorComponent,
    NotFoundErrorComponent,
    ToastComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  toasts: ToastData[] = [];
  cards: Card[] = [];
  page = 1;
  loading = false;
  hasRateLimitError = false;
  hasNotFoundError = false;
  noMoreResults = false;
  currentQuery = '';

  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
  private observer!: IntersectionObserver;

  constructor(
    private service: UnsplashService,
    private searchService: SearchService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.searchService.query$.subscribe((query) => {
      this.page = 1;
      this.noMoreResults = false;
      this.cards = [];
      this.loadImages();
    });

    this.searchService.searchResults$.subscribe((searchResults) => {
      if (searchResults && searchResults.length > 0) {
        this.cards = searchResults;
      }
    });

    this.toastService.toast$.subscribe((toast) => {
      this.toasts = toast;
    });
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.loading && !this.noMoreResults) {
        this.page++;
        this.loadImages();
      }
    });

    this.observer.observe(this.scrollAnchor.nativeElement);
  }

  loadImages() {
    this.loading = true;

    const query = this.searchService.getCurrentQuery();
    const request$ = query
      ? this.service.getSearchedImages(query, this.page)
      : this.service.getImages(this.page);

    if (query !== this.currentQuery) {
      this.cards = [];
      this.page = 1;
      this.noMoreResults = false;
      this.currentQuery = query;
    }

    request$.subscribe({
      next: (newCards) => {
        const newUniqueCards = newCards.filter(
          (card) => !this.cards.some((c) => c.id === card.id)
        );

        if (newUniqueCards.length === 0) {
          this.noMoreResults = true;
        } else {
          this.cards = [...this.cards, ...newUniqueCards];
        }

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err?.response?.status === 403) {
          this.hasRateLimitError = true;
        }
        if (err?.response?.status === 404) {
          this.hasNotFoundError = true;
        }
        console.error('❌ Error en carga:', err);
      },
    });
  }

  onToggleFavorite(isFavorite: boolean) {
    if (!isFavorite) {
      this.toastService.showToast('Removed from favorites', 'error');
    } else {
      this.toastService.showToast('Added to favorites', 'success');
    }
  }
}
