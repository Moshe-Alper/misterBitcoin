import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameTaken, onlyEnglishLetters } from '../../../custom-validators/contact.validators';

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
  private fb = inject(FormBuilder)
  contactForm!: FormGroup

  contact: Contact | null = null

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, onlyEnglishLetters], [nameTaken]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\+\-\(\) ]+$/)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['contact']),
      filter(contact => contact),
      takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: contact => {
          const contactToEdit = {...contact}
          this.contactForm.patchValue(contactToEdit)
          this.contact = contact
      }
    })
  }

  onSaveContact() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return
    }
    
    const contactToSave = {...this.contact, ...this.contactForm.value}
    this.contactService.saveContact(contactToSave)
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
