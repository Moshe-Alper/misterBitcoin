import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { UserService } from '../../../services/user.service';
import { User } from '../../models/user.modal';
import { BitcoinService } from '../../../services/bitcoin.service';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent implements OnInit {


  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)
  private destroyRef = inject(DestroyRef)

  users: User[] | undefined
  usersBtcValues: { [userId: string]: string } = {}

  ngOnInit() {
    this.userService.getUser()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (users: User[]) => {
        this.users = users
      }
    })
  }

  convertUserCoinToBTC() {
    this.bitcoinService.getRate()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        error: err => console.log('err', err)
      })
  }

}

