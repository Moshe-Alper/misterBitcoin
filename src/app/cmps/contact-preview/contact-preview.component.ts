import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-preview',
  standalone: false,
  templateUrl: './contact-preview.component.html',
  styleUrl: './contact-preview.component.scss'
})
export class ContactPreviewComponent {
  @Input() contact!: Contact
  @Output() remove = new EventEmitter<string>()
  @Output() select = new EventEmitter<Contact>()

}
