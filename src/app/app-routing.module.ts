import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserStocksComponent } from './pages/user-stocks/user-stocks.component'
import { HomeComponent } from './pages/home/home-component/home.component'
import { SignupComponent } from './pages/signup/signup.component'
import { PublicComponent } from './layouts/public/public.component'
import { LoggedComponent } from './layouts/logged/logged.component'
import { SigninComponent } from './pages/signin/signin.component'

const routes: Routes = [
  {
    path: '',
    component: LoggedComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user-stocks', component: UserStocksComponent },
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
