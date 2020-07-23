import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { LoginGuard } from './login.guard'
import { LandingComponent } from './landing/landing.component';
import { DibetesComponent } from './dibetes/dibetes.component';
import { MainComponent } from './main/main.component';
import { PredictorComponent } from './predictor/predictor.component';
import { ScComponent } from './sc/sc.component';
import { TrackHealthComponent } from './track-health/track-health.component';
import { ViewTrackComponent } from './view-track/view-track.component';
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
    canActivate: [LoginGuard],
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
