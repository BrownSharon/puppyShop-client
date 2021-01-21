import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { SuccessComponent } from './components/success/success.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'main', component: MainComponent },
      { path: 'order', component: OrderComponent },
      { path: 'success', component: SuccessComponent },
      { path: "", pathMatch: "full", redirectTo: "welcome" },
      { path: '**', component: WelcomeComponent }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
