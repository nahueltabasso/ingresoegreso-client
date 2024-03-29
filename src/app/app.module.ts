import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AuthModule } from './auth/auth.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { SharedModule } from './shared/shared.module';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { DolarComponent } from './dolar/dolar.component';
import { AddOperacionComponent } from './dolar/add-operacion/add-operacion.component';
import { EstadisticaDolarComponent } from './dolar/estadistica-dolar/estadistica-dolar.component';
import { ConsultarCriptomonedaComponent } from './web-service/consultar-criptomoneda/consultar-criptomoneda.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    DolarComponent,
    AddOperacionComponent,
    EstadisticaDolarComponent,
    ConsultarCriptomonedaComponent,
  ],
  entryComponents: [
    AddOperacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    ChartsModule,
    StoreModule.forRoot(appReducers,
        {  
          runtimeChecks: { 
            strictStateImmutability: false, 
            strictActionImmutability: false,
          } 
        }
      ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    // MatPaginatorModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
