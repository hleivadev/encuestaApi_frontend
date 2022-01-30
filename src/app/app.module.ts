import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EncuestaComponent } from './features/encuesta/encuesta.component';
import { AppRoutingModule } from './app-routing.module';
import { CrearEncuestaComponent } from './features/crear-encuesta/crear-encuesta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    EncuestaComponent,
    EncuestaComponent,
    CrearEncuestaComponent,
    CrearEncuestaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    EncuestaComponent,
    CrearEncuestaComponent]
})
export class AppModule { }
