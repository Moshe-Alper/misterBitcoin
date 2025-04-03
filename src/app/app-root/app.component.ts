import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'misterBitcoin'

    private contactService = inject(ContactService)
    private loaderService = inject(LoaderService)

    ngOnInit() {
        this.contactService.loadContacts()
            .subscribe({
                next: () => this.loaderService.setIsLoading(false),
                error: err => console.log('err:', err)
            })
    }
}