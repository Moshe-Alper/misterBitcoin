import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit {

  private contactService = inject(ContactService)
  private destroyRef = inject(DestroyRef)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  contact = this.contactService.getEmptyContact()

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['contact']),
      filter(contact => contact),
      takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: contact => this.contact = contact
      })
  }

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
