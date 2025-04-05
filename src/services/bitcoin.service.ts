import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { interval, map, Observable, of, switchMap, timer } from 'rxjs'
import { BlockchainChartResponse, BlockchainTradeVolumeResponse, Trade } from '../app/models/bitcoin.model'
import { storageService } from './storage.service'

@Injectable({
  providedIn: 'root'
})

export class BitcoinService {

  TRADE_VOLUME_KEY = 'tradeVolume'
  AVG_BLOCK_SIZE_KEY = 'avgBlockSize'


  constructor(private http: HttpClient) { }

  getRateStream(coins: number): Observable<string> {
    return timer(0, 1000 * 60 * 5).pipe(
      switchMap(idx => this.getRate(coins))
    )
  }

  getRate(coins: number): Observable<string> {
    return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
  }

  getTradeVolume(): Observable<Trade[]> {
    const data = storageService.load(this.TRADE_VOLUME_KEY)
    // console.log('data service', data)

    if (data) return of(data)
    return this.http.get<BlockchainTradeVolumeResponse>(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
      .pipe(map(res => {
        const vals: Trade[] = res.values.map(item => ({
          name: new Date(item.x * 1000).toLocaleDateString("en-US"),
          value: item.y
        }))
        storageService.store(this.TRADE_VOLUME_KEY, vals)
        return vals
      }))
  }
  getAvgBlockSize(): Observable<Trade[]> { 
    const data = storageService.load(this.AVG_BLOCK_SIZE_KEY)
    if (data) return of(data)

    return this.http.get<BlockchainChartResponse>(`https://api.blockchain.info/charts/n-transactions-per-block?timespan=5months&format=json&cors=true`)
      .pipe(map(res => {
        const vals: Trade[] = res.values.map(item => ({
          name: new Date(item.x * 1000).toLocaleDateString("en-US"), 
          value: item.y 
        }))
        storageService.store(this.AVG_BLOCK_SIZE_KEY, vals)
        return vals
      }))
  }
}


