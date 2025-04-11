import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../models/user.modal';



@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss'],
    standalone: false
})
export class ContactDetailsComponent  {
    private contactService = inject(ContactService)
    private userService = inject(UserService)
    private route = inject(ActivatedRoute)
    private router = inject(Router)

    
    contact$: Observable<Contact> = this.route.data.pipe(map(data => data['contact']))
    user: User = {} as User   
    
    onTransferCoins(amount: number) {
        this.contact$.pipe(
            switchMap(contact => this.userService.addMove(contact, amount)),
        ).subscribe({
            next: () => {
                console.log(`Transferred ${amount} coins`)
            },
            error: (err: Error | string | unknown) => {
                console.error('Error transferring coins:', err)
            }
        })
    }
    
    onBack() {
        this.router.navigateByUrl('/contact')
    }

}