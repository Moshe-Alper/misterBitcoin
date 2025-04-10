import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Contact } from '../../models/contact.model'

@Component({
  selector: 'transfer-fund',
  standalone: false,
  templateUrl: './transfer-fund.component.html',
  styleUrl: './transfer-fund.component.scss'
})
export class TransferFundComponent {
  // constructor(private msgService: MsgService) { }

  amount!: number | null

  @Input() contact!: Contact
  @Input() maxCoins!: number
  @Output() transferCoins = new EventEmitter()

  onTransferCoins(): void {
      if (!this.amount || this.maxCoins < this.amount) {
          // this.msgService.setErrorMsg('Not enough coins!')
          console.log('🚀Not enough coins! ')
      } else {
          this.transferCoins.emit(this.amount)
      }
      this.amount = null
  }
}
