import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    private contactService = inject(ContactService)

    ngOnInit() {
        this.contactService.loadContacts()
            .subscribe({
                error: err => console.log('err:', err)
            })

    }
}