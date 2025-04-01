import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';

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

  ngOnInit() {

    this.contactService.contacts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: contacts => {
          this.contacts = contacts
        }
      })
  }
}
