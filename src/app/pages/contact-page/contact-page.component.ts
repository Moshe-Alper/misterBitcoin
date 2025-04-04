import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-page',
  standalone: false,
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit {

  private contactService = inject(ContactService)
  private destroyRef = inject(DestroyRef)
  private router = inject(Router)

  contacts: Contact[] = []
  contacts$: Observable<Contact[]> = this.contactService.contacts$
  
  ngOnInit() {
    this.contacts$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(contacts => {
      this.contacts = contacts
    })
  }

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
      .subscribe({
        error: err => console.log('err', err)
      })
  }

  onSelectContact(contact: Contact) {
    this.router.navigate(['/contact', contact._id])
  }
}
