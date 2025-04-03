import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { PageNotFoundComponent } from './cmps/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'statistic', component: StatisticPageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', component: PageNotFoundComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
