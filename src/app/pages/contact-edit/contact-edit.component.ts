import { Component, DestroyRef, inject } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router';

@Component({
  selector: 'contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent {
  private contactService = inject(ContactService)
  private destroyRef = inject(DestroyRef)
  private router = inject(Router)

  contact = this.contactService.getEmptyContact()

  onSaveContact() {
    this.contactService.saveContact(this.contact as Contact)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: err => console.log('err:', err),
        complete: this.back
      })

  }
  back = () => {
    this.router.navigateByUrl('/contact')
  }
}
