import { Component, OnInit } from '@angular/core'
import { ChartType } from 'angular-google-charts'
import { BitcoinService } from '../../../services/bitcoin.service'

@Component({
  selector: 'chart', 
  standalone: false, 
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'] 
})
export class ChartComponent implements OnInit {

  tradeVolumeChartType: ChartType = ChartType.LineChart
  tradeVolumeData: any[][] = []
  tradeVolumeChartOptions = {
    title: 'Exchange Trade Volume (USD)',
    legend: { position: 'bottom' },
    vAxis: { title: 'Trade Volume (USD)' },
    height: 400,
    width: 1200,
  }
  tradeVolumeLoading: boolean = false
  tradeVolumeErrorMessage: string = ''

  avgTransChartType: ChartType = ChartType.LineChart
  avgTransData: any[][] = []
  avgTransChartOptions = {
    title: 'Average Transactions Per Block',
    legend: { position: 'bottom' },
    vAxis: { title: 'Avg. Transactions' },
    height: 400,
    width: 1200,
  }
  avgTransLoading: boolean = false
  avgTransErrorMessage: string = ''


  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.loadTradeVolumeData()
    this.loadAvgTransData() 
  }

  loadTradeVolumeData(): void {
    this.tradeVolumeLoading = true
    this.tradeVolumeErrorMessage = ''
    this.bitcoinService.getTradeVolume().subscribe({
      next: (data) => {
        this.tradeVolumeData = data.map(item => [item.name, item.value])

        this.tradeVolumeLoading = false
      },
      error: (err) => { 
        console.error('Trade Volume Error:', err)
        this.tradeVolumeErrorMessage = 'Failed to load trade volume data.'
        this.tradeVolumeLoading = false
      },
    })
  }

  loadAvgTransData(): void {
    this.avgTransLoading = true
    this.avgTransErrorMessage = ''
    this.bitcoinService.getAvgBlockSize().subscribe({ 
      next: (data) => {

        this.avgTransData = data.map(item => [item.name, item.value])

        this.avgTransLoading = false
      },
      error: (err) => { 
        console.error('Avg Transactions Error:', err)
        this.avgTransErrorMessage = 'Failed to load average transactions data.'
        this.avgTransLoading = false
      },
    })
  }
}