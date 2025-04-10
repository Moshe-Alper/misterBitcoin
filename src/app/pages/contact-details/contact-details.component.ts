import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';



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
    
    onTransferCoins() {
        console.log('Transfer')
    }
    

    onBack() {
        this.router.navigateByUrl('/contact')
    }

}