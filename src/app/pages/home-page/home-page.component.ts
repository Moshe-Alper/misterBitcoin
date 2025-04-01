import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { UserService } from '../../../services/user.service';
import { User } from '../../models/user.modal';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent implements OnInit {

  private contactService = inject(ContactService)
  private destroyRef = inject(DestroyRef)
  contacts: Contact[] | undefined

  private userService = inject(UserService)
  users: User[] | undefined

  ngOnInit() {
    this.contactService.contacts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: contacts => {
          this.contacts = contacts
        }
      })

    this.userService.getUser()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (users: User[]) => {
        this.users = users
      }
    })
  }


}

