import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { MsgWelcomeComponent } from './components/msg-welcome/msg-welcome.component';
import { OrderComponent } from './components/order/order.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { Register1Component } from './components/register1/register1.component';
import { Register2Component } from './components/register2/register2.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { LoggedGuard } from './guards/logged.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';
import { UserRoleGuard } from './guards/user-role.guard';


const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent,
    children: [
      { path: 'register1', component: Register1Component, canActivateChild: [NotLoggedGuard] },
      { path: 'register2', component: Register2Component, canActivateChild: [NotLoggedGuard] },
      { path: 'login', component: LoginComponent, canActivateChild: [NotLoggedGuard] },
      { path: 'welcome-msg', component: MsgWelcomeComponent, canActivateChild: [LoggedGuard, UserRoleGuard] }
    ]
  },
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'admin', component: ProductFormComponent, canActivateChild: [LoggedGuard, AdminRoleGuard] },
      { path: 'cart', component: CartComponent, canActivateChild: [LoggedGuard, UserRoleGuard] }
    ]
  },
  { path: 'order', component: OrderComponent, canActivateChild: [LoggedGuard, UserRoleGuard] },
  { path: "", pathMatch: "full", redirectTo: "welcome" },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
