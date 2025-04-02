import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, take } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) {}

  public getRate() {
    return this.http.get<{ answer: string }>('https://blockchain.info/tobtc?currency=USD&value={value}')
        .pipe(
            map(res => res.answer),
            retry(2),
            catchError(err => throwError(() => err))
        )
}
}
