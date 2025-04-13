import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../models/user.modal';
import { MsgService } from '../../../services/msg.service';



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
    private msgService = inject(MsgService)

    
    contact$: Observable<Contact> = this.route.data.pipe(map(data => data['contact']))
    user$: Observable<User> = this.userService.loggedInUser$.pipe(
        filter((user): user is User => !!user) // Make sure we only get non-null users
    )
    user: User = {} as User   
    
    contactMoves$ = combineLatest([this.user$, this.contact$]).pipe(
        filter(([user]) => !!user),
        map(([user, contact]) => user.moves.filter(move => move.toId === contact._id)),
    )


    onTransferCoins(amount: number) {
        this.contact$.pipe(
            switchMap(contact => this.userService.addMove(contact, amount)),
        ).subscribe({
            next: () => {
                this.msgService.setSuccessMsg(`Transferred ${amount} coins`)
            },
            error: (err) => {
                this.msgService.setErrorMsg(`Error while transferring coins`)
            }
        })
    }
    
    onBack() {
        this.router.navigateByUrl('/contact')
    }

}