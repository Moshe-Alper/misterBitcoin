import { Component, inject, OnInit } from '@angular/core';
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
  contacts: Contact[] | undefined

  private userService = inject(UserService)
  users: User[] | undefined

  ngOnInit() {
    this.contactService.contacts$.subscribe({
      next: contacts => {
        this.contacts = contacts
      }
    })

    this.loadUsers()
  }

  private loadUsers() {
    this.userService.getUser().subscribe({
      next: (users: User[]) => {
      this.users = users
      }
    })
  }
}
