import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeasuresComponent } from './measures/measures.component';
import { MeasureComponent } from './measure/measure.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { FoodComponent } from './food/food.component';
import { RecapComponent } from './recap/recap.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasuresComponent,
    MeasureComponent,
    ExerciceComponent,
    FoodComponent,
    RecapComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
