import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeHistoryService  {

  constructor(private httpClient: HttpClient) { }

  getUserRecapHistory(userId: Number): Observable<any[]> {
    return this.httpClient
      .get<any>(`http://localhost:3000/users/${userId}`)
      .pipe(
        map(user => user?.recaps ?? []), // return [] if recaps is missing
        catchError(err => {
          console.error('Failed to load user recaps', err);
          return of([]); // return an empty array on error
        })
      );
  }
}