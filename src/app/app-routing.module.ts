import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/guard/auth.guard';
import { ConsultarCriptomonedaComponent } from './web-service/consultar-criptomoneda/consultar-criptomoneda.component';


const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'resetpassword', component: ResetPasswordComponent },
    { path: 'consultar-criptomoneda', component: ConsultarCriptomonedaComponent },
    {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({

    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {}
