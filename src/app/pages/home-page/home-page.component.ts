import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  private contactService = inject(ContactService)
  contacts: Contact[] | undefined

  ngOnInit() {
    this.contactService.contacts$.subscribe({
      next: contacts => {
        this.contacts = contacts
      }
    })
  }
}
