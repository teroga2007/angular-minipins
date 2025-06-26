import { Injectable } from '@angular/core';
import axios from 'axios';
import { env } from '../../env/env';
import { Card } from '../models/card';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  private ACCESS_KEY = env.ACCESS_KEY;
  private url = 'https://api.unsplash.com/search/photos';

  constructor() {}

  getImages(page: number): Observable<Card[]> {
    const request = axios.get(this.url, {
      params: {
        query: 'nature',
        client_id: this.ACCESS_KEY,
        page: page,
        per_page: 12,
      },
    });

    return from(request).pipe(
      map((res) => {
        return res.data.results.map((item: any) => {
          return new Card(
            item.id,
            item.description || item.alt_description || 'Untitled',
            '',
            {
              regular: item.urls?.regular || '',
              small: item.urls?.small || '',
            },
            item.alt_description || '',
            item.likes || 0
          );
        });
      })
    );
  }

  getSearchedImages(query: string, page = 1): Observable<Card[]> {
    const request = axios.get(this.url, {
      params: {
        query,
        client_id: this.ACCESS_KEY,
        per_page: 12,
        page,
      },
    });

    return from(request).pipe(
      map((res) => {
        return res.data.results.map((item: any) => {
          return new Card(
            item.id,
            item.description || item.alt_description || 'Untitled',
            '',
            {
              regular: item.urls?.regular || '',
              small: item.urls?.small || '',
            },
            item.alt_description || '',
            item.likes || 0
          );
        });
      })
    );
  }

  getImageById(id: string): Observable<Card> {
    const request = axios.get(`https://api.unsplash.com/photos/${id}`, {
      params: {
        client_id: this.ACCESS_KEY,
        photoId: id,
      },
    });

    return from(request).pipe(
      map((res) => {
        return new Card(
          res.data.id,
          res.data.description || res.data.alt_description || 'Untitled',
          '',
          {
            regular: res.data.urls?.regular || '',
            small: res.data.urls?.small || '',
          },
          res.data.alt_description || '',
          res.data.likes || 0
        );
      })
    );
  }
}
