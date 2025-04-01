import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
// import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class BitcoinService {
  private API_URL = 'https://blockchain.info/tobtc'

  constructor(private http: HttpClient) { }

  getRate(coins: number): Promise<number> {
    return fetch(`${this.API_URL}?currency=USD&value=${coins}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then(data => {
        return parseFloat(data)
      })
  }

//   getRateObservable(coins: number): Observable<number> {
//     return this.http.get<number>(`${this.API_URL}?currency=USD&value=${coins}`, 
//       { responseType: 'text' as 'json' })
//   }
}