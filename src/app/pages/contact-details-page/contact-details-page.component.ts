import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { Observable } from 'rxjs';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'contact-details-page',
  standalone: false,
  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit {

  private contactService = inject(ContactService)
  private destroyRef = inject(DestroyRef)

  contacts: Contact[] | undefined
  contacts$: Observable<Contact[]> = this.contactService.contacts$


  ngOnInit() {

  }

}
