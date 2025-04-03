import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { User } from '../../models/user.modal';
import { BitcoinService } from '../../../services/bitcoin.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent implements OnInit {

  user!: User
  BTC$!: Observable<string>


  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) { }


  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.BTC$ = this.bitcoinService.getRate(100)
  }

}

