import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { LostReportComponent } from './lost-report/lost-report.component';
import { FoundReportComponent } from './found-report/found-report.component';
import { SearchAllComponent } from './search-all/search-all.component';

const routes: Routes = [
  // {
  //   path: "signup",
  //   component: SignupComponent,
  // },
  {
    path: "",
    component: LandingComponent,
    // canActivate: [LoginGuard],
    children: [
      {
        path: "main",
        component: MainComponent,
      },
      {
        path: "lostReport",
        component: LostReportComponent,
      },
      {
        path: "foundReport",
        component: FoundReportComponent,
      },
      {
        path: "searchLost",
        component: SearchAllComponent,
      },
    ]
  },
  // {
  //   path: "",
  //   component: LoginComponent,
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
