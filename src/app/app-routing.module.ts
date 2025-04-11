import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { PageNotFoundComponent } from './cmps/page-not-found/page-not-found.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { authGuard } from './guards/auth.guard';
import { contactResolver } from './resolvers/contact.resolver';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent, canActivate: [authGuard]},
  {path: 'contact', component: ContactPageComponent, canActivate: [authGuard], children: [
    {path: 'edit', component: ContactEditComponent, canActivate: [authGuard]},
    {path: 'edit/:contactId', component: ContactEditComponent, canActivate: [authGuard], resolve: {contact: contactResolver}},
  ]},
  {
    path: 'contact/:contactId', 
    component: ContactDetailsComponent, 
    canActivate: [authGuard],
    resolve: { contact: contactResolver }
  },
  {path: 'statistic', component: StatisticPageComponent, canActivate: [authGuard]},
  {path: 'signup', component: SignUpComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', component: PageNotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
