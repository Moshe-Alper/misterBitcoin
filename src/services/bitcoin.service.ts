import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, switchMap, timer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class BitcoinService {

  TRADE_VOLUME_KEY = 'tradeVolume'

  constructor(private http: HttpClient) { }

  getRateStream(coins: number): Observable<string> {
    return timer(0, 1000 * 60 * 5).pipe(
      switchMap(idx => this.getRate(coins))
    )
  }

  getRate(coins: number): Observable<string> {
    return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
  }

}
