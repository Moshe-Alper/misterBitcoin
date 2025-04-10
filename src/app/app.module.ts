import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ChartComponent } from './cmps/chart/chart.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { LoaderComponent } from './cmps/loader/loader.component';
import { PageNotFoundComponent } from './cmps/page-not-found/page-not-found.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        ContactPageComponent,
        ContactListComponent,
        ContactPreviewComponent,
        ContactFilterComponent,
        ContactDetailsComponent,
        StatisticPageComponent,
        AppHeaderComponent,
        LoaderComponent,
        PageNotFoundComponent,
        ContactEditComponent,
        ChartComponent,
        SignUpComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        GoogleChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }