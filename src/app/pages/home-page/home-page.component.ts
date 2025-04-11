import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { filter, Observable, Subscription, switchMap } from 'rxjs'

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
    this.user$ = this.userService.loggedInUser$.pipe(
      filter((user): user is User => user !== null)
    )

    this.user$.subscribe(user => {
      console.log('Logged-in user:', user)

      this.BTC$ = this.user$.pipe(
        switchMap(user => this.bitcoinService.getRateStream(user.coins))
      )
    })
  }

  onAddMoveDemo() {
    const contact = {

      "_id": "5a5664025f6ae9aa24a99fde",
      "name": "Hallie Mclean",
      "email": "halliemclean@renovize.com",
      "phone": "+1 (948) 464-2888"
    }
    const amount = Math.ceil(Math.random() * 10)
    this.userService.addMove(contact, amount).subscribe({
      next: () => {
        console.log('Move added successfully')
      },
      error: (err: Error | string | unknown) => {
        console.error('Error adding move:', err)
      }
    })
  }
}

