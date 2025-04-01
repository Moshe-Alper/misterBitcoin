import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { ContactFilter } from '../../models/contact.model';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'contact-filter',
  standalone: false,
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit {

  private destroyRef = inject(DestroyRef)
  private contactService = inject(ContactService)
  filterBy!: ContactFilter

  ngOnInit(): void {
    this.contactService.filterBy$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })
  }
}
