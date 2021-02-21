import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { SuccessComponent } from './components/success/success.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoggedGuard } from './guards/logged.guard';
import { LoggedUserGuard } from './guards/loggedUser.guard';
import { UnLoggedGuard } from './guards/unLogged.guard';

const routes: Routes = [
      { path: 'welcome', component: WelcomeComponent, canActivate: [LoggedUserGuard, UnLoggedGuard ] },
      { path: 'main', component: MainComponent, canActivate: [LoggedGuard] },
      { path: 'order', component: OrderComponent, canActivate: [LoggedUserGuard] },
      { path: 'success', component: SuccessComponent, canActivate: [LoggedUserGuard] },
      { path: "", pathMatch: "full", redirectTo: "welcome" },
      { path: '**', component: WelcomeComponent }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
