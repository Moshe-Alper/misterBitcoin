import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { PageNotFoundComponent } from './cmps/page-not-found/page-not-found.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'contact', component: ContactPageComponent, children: [
    {path: 'edit', component: ContactEditComponent},
    {path: 'edit/:contactId', component: ContactEditComponent},
  ]},
  {path: 'contact/:contactId', component: ContactDetailsComponent, canActivate: [authGuard]},
  {path: 'statistic', component: StatisticPageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', component: PageNotFoundComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
