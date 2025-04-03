import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class BitcoinService {

      TRADE_VOLUME_KEY = 'tradeVolume'

  constructor(private http: HttpClient) { }

  getRate(coins: number): Observable<string> {
    return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
}


}
