import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { Observable, Subscription, switchMap } from 'rxjs'

import { User } from '../../models/user.modal'
import { BitcoinService } from '../../../services/bitcoin.service'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent implements OnInit {

  user$!: Observable<User>
  BTC$!: Observable<string>


  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) { }


  ngOnInit() {
    this.user$ = this.userService.loggedInUser$
    this.BTC$ = this.user$.pipe(
      switchMap(user => this.bitcoinService.getRateStream(user.coins))
    )
  }

}

