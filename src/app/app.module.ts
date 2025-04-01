import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }






////////////////////////////////////////////////////
// function addExMark(str: string) {
//     return str + '!'
// }


// var str = 'hello'
// str = addExMark(str)

// @addExMark
// var str = 'hello'