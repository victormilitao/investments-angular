import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStocksComponent } from './pages/user-stocks/user-stocks.component';
import { HomeComponent } from './pages/home/home-component/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "user-stocks",
    component: UserStocksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
