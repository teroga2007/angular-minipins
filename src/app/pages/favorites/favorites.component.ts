import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Card } from '../../models/card';
import { RouterModule } from '@angular/router';
import { selectAllFavorites } from '../../store/favorites.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  addFavorite,
  removeFavorite,
  updateNote,
} from '../../store/favorites.actions';
import { FormsModule } from '@angular/forms';
import { NewlinePipe } from '../../newline.pipe';

@Component({
  selector: 'app-favorites',
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    FormsModule,
    NewlinePipe,
  ],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites$!: Observable<Card[]>;
  selectedCard: Card | null = null;
  noteText = '';
  editingCard: Card | null = null;
  editedNote: string = '';

  @Input() showToast: boolean = false;

  @ViewChild('editingTextarea')
  editingTextareaRef!: ElementRef<HTMLTextAreaElement>;

  constructor(private store: Store) {}

  isFavorite(card: Card): Observable<boolean> {
    return this.favorites$.pipe(
      map((favorites) => favorites.some((fav) => fav.id === card.id))
    );
  }

  toggleFavorite(card: Card) {
    this.isFavorite(card).subscribe((isFav) => {
      if (isFav) {
        this.store.dispatch(removeFavorite({ cardId: card.id }));
      } else {
        this.store.dispatch(addFavorite({ card }));
      }
    });
  }

  ngOnInit() {
    this.favorites$ = this.store.select(selectAllFavorites);
  }

  editNote(card: Card) {
    this.editingCard = card;
    this.editedNote = card.notes || '';

    setTimeout(() => {
      this.editingTextareaRef?.nativeElement?.focus();
    }, 0);
  }

  saveNote(card: Card) {
    this.store.dispatch(updateNote({ cardId: card.id, note: this.editedNote }));
    this.editingCard = null;
    this.editedNote = '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.editingCard) return;

    const editingBodies = document.querySelectorAll('.editable-card-body');

    const clickedInsideAny = Array.from(editingBodies).some((body) =>
      body.contains(event.target as Node)
    );

    if (!clickedInsideAny) {
      this.saveNote(this.editingCard);
    }
  }
}
