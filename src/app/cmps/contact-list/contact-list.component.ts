import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  @Input() contacts: Contact[] | null = null
  @Input() selectedContact: Contact | null = null

  @Output() remove = new EventEmitter<string>()
  @Output() select = new EventEmitter<Contact>()

}
