import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { ContactFilter } from '../../models/contact.model';
import { ContactService } from '../../../services/contact.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'contact-filter',
  standalone: false,
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit {

  private destroyRef = inject(DestroyRef)
  private contactService = inject(ContactService)
  private filterSubject = new Subject()

  filterBy!: ContactFilter

  ngOnInit(): void {
    this.contactService.filterBy$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })

    this.filterSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.contactService.setFilter(this.filterBy)
      })

  }
  onSetFilter(filterTerm: string) {
    this.filterSubject.next(filterTerm)
  }
}
