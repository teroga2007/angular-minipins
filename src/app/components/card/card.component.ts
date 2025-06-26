import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/card';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { isFavorite } from '../../store/favorites.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() image!: Card;
  @Input() showToast: boolean = false;
  @Output() toggleFavoriteEvent = new EventEmitter<boolean>();

  isFavorite$!: Observable<boolean>;

  constructor(
    public router: Router,
    private store: Store,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    if (this.image?.id) {
      this.isFavorite$ = this.store.pipe(
        select(isFavorite, { id: this.image.id })
      );
    }
  }

  toggleFavorite(e: Event) {
    e.stopPropagation();
    this.favoritesService.toggleFavorite(this.image).then((wasAdded) => {
      this.toggleFavoriteEvent.emit(wasAdded);
    });
  }

  share(card: Card) {
    navigator.share
      ? navigator.share({
          title: card.title,
          text: card.notes || card.alt,
          url: card.urls.regular,
        })
      : alert('Sharing not supported on this browser');
  }

  public navigateToImageDetail(card: Card) {
    this.router.navigate([`/image-detail/${card.id}`]);
  }
}
