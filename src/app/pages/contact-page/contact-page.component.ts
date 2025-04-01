import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'contact-page',
  standalone: false,
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit {

  private contactService = inject(ContactService)
  private destroyRef = inject(DestroyRef)

  contacts: Contact[] | undefined
  contacts$: Observable<Contact[]> = this.contactService.contacts$


  ngOnInit() {

  }

  onRemoveContact(contactId: string) {
    console.log('🚀 hi')
    this.contactService.deleteContact(contactId)
      .subscribe({
        error: err => console.log('err', err)
      })
  }

}
