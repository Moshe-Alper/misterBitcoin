import { Component, OnInit } from '@angular/core'
import { ChartType } from 'angular-google-charts'
import { Trade } from '../../models/bitcoin.model'
import { BitcoinService } from '../../../services/bitcoin.service'

@Component({
  selector: 'chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {
  chartType: ChartType = ChartType.LineChart
  myData: any[][] = []
  chartOptions = {
    title: 'USD Exchange Trade Volume',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Date',
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: { title: 'Trade Volume (USD)' },
  }
  loading: boolean = false
  errorMessage: string = ''

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.loadTradeVolumeData()
  }

  loadTradeVolumeData(): void {
    this.loading = true
    this.errorMessage = ''
    this.bitcoinService.getTradeVolume().subscribe({
      next: (data) => {
        this.myData = data.map((item) => [item.name, item.value])
        this.loading = false
      },
      error: () => {
        this.errorMessage = 'Failed to load trade volume data.'
        this.loading = false
      },
    })
  }
}