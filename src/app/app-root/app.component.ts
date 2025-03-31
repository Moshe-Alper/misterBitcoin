import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

    ngOnInit() {
        console.log('Hello Angular!')
    }

    ngOnDestroy() {

    }

}
