import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/card';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchResultsSubject = new BehaviorSubject<Card[] | null>(null);
  searchResults$ = this.searchResultsSubject.asObservable();

  private currentQuerySubject = new BehaviorSubject<string>(''); // <-- observable para query
  query$ = this.currentQuerySubject.asObservable();

  private searchResults: Card[] = [];

  setQuery(query: string) {
    this.currentQuerySubject.next(query);
  }

  clearQuery() {
    this.setQuery('');
    this.clearSearchResults();
  }
  setSearchResults(results: Card[], query: string) {
    this.currentQuerySubject.next(query);
    this.searchResults = results;
    this.searchResultsSubject.next(results);
  }

  appendSearchResults(newResults: Card[]) {
    this.searchResults = [...this.searchResults, ...newResults];
    this.searchResultsSubject.next(this.searchResults);
  }

  clearSearchResults() {
    this.searchResults = [];
    this.searchResultsSubject.next(null);
  }

  getCurrentQuery(): string {
    return this.currentQuerySubject.value;
  }
}
